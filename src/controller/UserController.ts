import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

export const saveUser = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  try {
    const passwordHash = await bcrypt.hash(password, 8);
    const user = await getRepository(User).save({
      name,
      email,
      password: passwordHash,
    });

    return response.status(201).json(user);
  } catch (error) {
    return response.status(422).json({ message: 'Error in entities!' });
  }
};
export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const user = await getRepository(User).find({
      where: {
        email,
      },
    });

    if (await bcrypt.compare(password, user[0].password)) {
      const data = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      };
      return response.json(data);
    } else {
      return response.status(404).json({ message: 'Wrong password!' });
    }
  } catch (error) {
    return response.status(404).json({ message: 'User not found!' });
  }
};

export const forgotPassword = async (request: Request, response: Response) => {
  const { email } = request.body;

  try {
    const user = await getRepository(User).find({
      where: {
        email,
      },
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'seu username',
        pass: 'sua senha',
      },
    });

    const newPassword = crypto.randomBytes(4).toString('HEX');

    transporter
      .sendMail({
        from: 'Administrador<c50082021d-0cdd5f@inbox.mailtrap.io>',
        to: email,
        subject: 'Recuperação de Senha',
        html: `<p>A sua nova senha de acesso é: <b>${newPassword}</b> por favor, faça login em nosso sistema e a altere para uma senha de sua preferência.</p><br/><a href="https://google.com">Sistema<a>`,
      })
      .then(async () => {
        const updatesPassword = await bcrypt.hash(newPassword, 8);
        getRepository(User).update(user[0].id, {
          password: updatesPassword,
        });

        return response.status(200).json({
          message: `Um e-mail foi enviado para ${email}, contendo as informações para login.`,
        });
      })
      .catch((error) => {
        return response.status(404).json(`Não foi possível enviar o email. Detalhes: ${error}`);
      });
  } catch (error) {
    return response.status(404).json({ message: 'User not found!' });
  }
};
