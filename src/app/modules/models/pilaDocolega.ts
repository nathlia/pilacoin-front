export class PilaDoColega {
    id?: number;
    idCriador?: string;
    dataCriacao?: Date;
    chaveCriador?: number[];
    assinaturaMaster?: number[];
    nonce?: bigint;
    status?: string;

    static AG_VALIDACAO = 'AG_VALIDACAO';
    static AG_BLOCO = 'AG_BLOCO';
    static BLOCO_EM_VALIDACAO = 'BLOCO_EM_VALIDACAO';
    static VALIDO = 'VALIDO';
    static INVALIDO = 'INVALIDO';
}
