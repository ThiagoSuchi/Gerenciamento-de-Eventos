import { menuGerenciamento } from "..";

export function validacaoData(data: string): string | boolean {
    const partes = data.split("/");

    if(partes.length !== 3){
        console.error('\nFormato de data inválida! Use: DD/MM/AAAA\n')
        menuGerenciamento()
        return false
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = parseInt(partes[2], 10);

    const dataFormat = new Date(ano, mes, dia);
    if(dataFormat.getDate() !== dia || dataFormat.getMonth() !== mes || dataFormat.getFullYear() !== ano) {
        console.error('\nData inválida! A data fornecida não existe.\n')
        menuGerenciamento()
        return false
    }

    return true
}