
export default function validations() {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  const email = (val: string) => emailPattern.test(val) || 'Insira um endereço de E-mail válido.';

  const required2 = (val: string) => {
    return !!val || 'Campo obrigatório';
  };

  return {
    email,
    required2
  };
}

export function required(val: string) {
  return !!val || 'Campo obrigatório';
}