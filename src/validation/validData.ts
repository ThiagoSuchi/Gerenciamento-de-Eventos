export function validacaoData(data: string): string | boolean {
    const partes = data.split("/");

    if(partes.length !== 3){
        console.log('Formato de data inválida! Use: DD/MM/AAAA')
        return false
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    const dataFormat = new Date(ano, mes, dia);
    if(dataFormat.getDate() !== dia || dataFormat.getMonth() !== mes || dataFormat.getFullYear() !== ano) {
        console.log('Data inválida! A data fornecida não existe.')
        return false
    }

    return true
}