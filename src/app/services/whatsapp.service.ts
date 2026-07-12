import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WhatsappService {
  abrirConversa(telefone: string, produtoNome: string): void {
    const telefoneFormatado = this.formatarTelefone(telefone);

    const mensagem = `
Olá! Tenho interesse no produto "${produtoNome}" que você anunciou no CF Style.
    `.trim();

    const url = `https://wa.me/${telefoneFormatado}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
  }

  private formatarTelefone(telefone: string): string {
    // remove tudo que não for número
    let numero = telefone.replace(/\D/g, '');

    // se não tiver código do Brasil, adiciona
    if (!numero.startsWith('55')) {
      numero = `55${numero}`;
    }

    return numero;
  }
}
