const forgotPassword = (name, token) => {
  return (
    `<h3>Olá ${name} !` +
    `<br />` +
    `<p>Vimos que voce esqueceu sua senha, utilize o token: ${token} para resetar a senha</p>` +
    `<br />` +
    `<strong>Equipe Pets</strong>`
  );
};

module.exports = { forgotPassword };
