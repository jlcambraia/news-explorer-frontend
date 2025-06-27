import './WarningPopup.css';

export default function WarningPopup() {
	return (
		<>
			<p className='warning-popup__text'>
				A API responsável por Registro, Login e Salvamento de Artigos está
				hospedada em um servidor gratuito que{' '}
				<span className='warning-popup__font-weight_bold'>
					pode entrar em hibernação após um período de inatividade.
				</span>
				<span className='warning-popup__paragraph'>
					Por isso, o tempo de resposta na{' '}
					<span className='warning-popup__font-weight_bold'>
						primeira utilização
					</span>{' '}
					(como durante o registro) pode ser mais lento. Após esse primeiro
					acesso, a API volta a responder normalmente.
				</span>
				<span className='warning-popup__paragraph'>
					Já a API utilizada para{' '}
					<span className='warning-popup__font-weight_bold'>
						busca de artigos
					</span>{' '}
					é fornecida por terceiros e permanece ativa continuamente, garantindo
					respostas rápidas desde o início.
				</span>{' '}
				<span className='warning-popup__paragraph'>
					Agradeço a todos pela compreensão.
				</span>
			</p>
		</>
	);
}
