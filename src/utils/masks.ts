export const maskCpf = (cpf: string): string => cpf
  .replace(/\D/g, '')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export const maskPhone = (phone: string): string => phone
  .replace(/\D/g, '+')
  .replace(/(\d{2})(\d)/, '$1 $2')
  .replace(/(\d{2})(\d)/, '$1 $2')
  .replace(/(\d{5})(\d)/, '$1-$2');
