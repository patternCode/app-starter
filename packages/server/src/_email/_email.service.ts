import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterMailDto } from './dto/register.dto';
import { ForgotPasswordMailDto } from './dto/forgot-password.dto';

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	public async sendMailRegister(user: RegisterMailDto): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to: user.email,
				from: 'from@example.com',
				subject: 'Registration successful ✔',
				text: 'Registration successful!',
				template: 'index',
				context: {
					title: 'Registration successfully',
					firstname: user.firstname,
					email: user.email,
					description:
						"You did it! You registered!, You're successfully registered. ✔",
					link: `http://localhost:3001/auth/verify-email/${user.email}/${user.email_token}`,
					token: user.email_token,
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Sending email failed',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	public async sendMailForgotPassword(
		user: ForgotPasswordMailDto,
	): Promise<void> {
		try {
			await this.mailerService.sendMail({
				to: user.email,
				from: 'from@example.com',
				subject: 'Forgot Password successful ✔',
				text: 'Forgot Password successful!',
				template: 'index',
				context: {
					title: 'Forgot Password successfully',
					firstname: user.firstname,
					email: user.email,
					description: 'Request Reset Password. Follow this link:',
					link: `http://localhost:3001/auth/change-password/${user.email}/${user.email_token}`,
					token: user.email_token,
				},
			});
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Sending email failed',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
