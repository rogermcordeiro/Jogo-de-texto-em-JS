const prompt = require("prompt-sync")();

let turno = 1;

let jogador = {
  nick: prompt("Digite seu Nick: "),
  vida: 100,
  dano: 10,
  defesa: 0,
  qtd_dano: 2,
  qtd_cura: 5,
  verificador_dobro_dano: false,
  contador_dobro_dano: 0,
  modo_defesa: false,
  atacar: function () {
    return (inimigo.vida -= this.dano - inimigo.defesa);
  },
  defender: function () {
    return (this.modo_defesa = true);
  },
};

let inimigo = {
  nick: "Inimigo",
  vida: 100,
  dano: 10,
  defesa: 0,
  qtd_dano: 2,
  qtd_cura: 5,
  acao: 0,
  verificador_dobro_dano: false,
  contador_dobro_dano: 0,
  modo_defesa: false,
  atacar: function () {
    return (jogador.vida -= this.dano - jogador.defesa);
  },
  defender: function () {
    return (this.modo_defesa = true);
  },
};

//Mensagem de boas vindas:
console.log(
  "\nSeja bem vindo " +
    jogador.nick +
    "!\n\nEste é um jogo de turnos contra um robô, você tera 3 opções quando começar(atacar, defender, tomar uma poção), digite somente o número correspondente a cada uma delas.\nDica: Você terá somente 2 poções de dano e 5 poções de cura, então as use bem...\n\nSe divirta 😀\n(Não o emoji não é pq fiz com IA)",
);
prompt.hide("\nAperte Enter para começar...\n");
//Jogo rodando até a vida de alguém zerar:
while (jogador.vida > 0 && inimigo.vida > 0) {
  console.log("Turno: " + turno);
  console.log("Vida de " + jogador.nick + ": " + jogador.vida);
  console.log("Vida de " + inimigo.nick + ": " + inimigo.vida);
  if (turno > 1) {
    prompt.hide("\nAperte Enter para continuar...\n");
  }

  //Vez do Jogador
  console.log("SUA VEZ: \n1-Atacar \n2-Defender \n3-Usar Poção");
  let escolha = prompt("-> ");

  //Ações do jogador:
  switch (escolha) {
    //Atacar
    case "1":
      let critico = Math.floor(Math.random() * 100) + 1;
      if (critico <= 80) {
        jogador.atacar();
        console.log("\nVocê o atacou e causou " + jogador.dano + " de dano\n");
      } else {
        jogador.dano += jogador.dano;
        jogador.atacar();
        console.log(
          "\nVocê acertou um DANO CRÍTICO e causou " +
            jogador.dano +
            " de dano\n",
        );
        if (jogador.verificador_dobro_dano == false) {
          jogador.dano = 10;
        } else {
          jogador.dano = 20;
        }
      }
      break;

    //Defender
    case "2":
      jogador.defesa = Math.floor(Math.random() * 10) + 1;
      jogador.defender();
      jogador.modo_defesa = true;
      console.log(
        "\nVocê preparou sua defesa, se ele te atacar essa rodada você irá tomar " +
          jogador.defesa +
          " de dano a menos\n",
      );
      break;

    //Usar poção
    case "3":
      console.log(
        "\n1-Poção de Dobro de Dano (" +
          jogador.qtd_dano +
          ")\n2-Poção de Cura (" +
          jogador.qtd_cura +
          ")",
      );
      let pocao = prompt("-> ");

      //Poção de dobro de dano
      switch (pocao) {
        case "1":
          if (jogador.verificador_dobro_dano == false && jogador.qtd_dano > 0) {
            jogador.dano += jogador.dano;
            jogador.contador_dobro_dano = 3;
            jogador.verificador_dobro_dano = true;
            jogador.qtd_dano -= 1;
            console.log(
              "\nVocê dobrou seu dano, só é possível tomar essa poção após o efeito passar, o efeito ficará em você por 2 rodadas\n",
            );
          } else if (jogador.verificador_dobro_dano == true) {
            console.log("\nVocê já está sob o efeito da poção de duplo dano\n");
          } else {
            console.log(
              "Você não tem mais poções de dobro de dano disponíveis",
            );
          }
          break;

        //Poção de cura
        case "2":
          if (jogador.qtd_cura > 0) {
            jogador.vida += 5;
            jogador.qtd_cura -= 1;
            console.log("\nVocê curou 5 de vida\n");
          } else {
            console.log("\nVocê não tem mais poções de cura disponíveis\n");
          }

          break;

        default:
          console.log("\nSó 1 ou 2 imbecil...");
          break;
      }
    case "67":
        console.log("SIX SEVEEEENNN!!!!!!");
      break;

    default:
      console.log("\nSó 1,2 ou 3 imbecil...");
  }

  //Tirar defesa do Inimigo
  if (inimigo.modo_defesa == true) {
    inimigo.modo_defesa = false;
    inimigo.defesa = 0;
  }

  console.log("Vida de " + jogador.nick + ": " + jogador.vida);
  console.log("Vida de " + inimigo.nick + ": " + inimigo.vida);

  prompt.hide("\nAperte Enter para continuar...\n");
  //Vez do Inimigo
  console.log("VEZ DO INIMIGO: \n");

  //Ações do inimigo:
  let randomizer_inimigo = 0;
  if (inimigo.qtd_cura > 0 && inimigo.vida < 21) {
    randomizer_inimigo = 101;
  } else if (
    inimigo.vida < 15 ||
    (inimigo.vida < 15 && inimigo.qtd_cura == 0)
  ) {
    randomizer_inimigo = 102;
  } else {
    randomizer_inimigo = Math.floor(Math.random() * 100) + 1;
  }

  //Define oque ele vai fazer:
  if (randomizer_inimigo <= 60) {
    inimigo.acao = 1; //Ataca
  } else if (randomizer_inimigo > 60 && randomizer_inimigo <= 80) {
    inimigo.acao = 2; //Defende
  } else if (randomizer_inimigo > 80 && randomizer_inimigo <= 100) {
    inimigo.acao = 3; //Usa poção
  } else if (randomizer_inimigo == 101) {
    inimigo.acao = 4; //Modo de cura
  } else {
    inimigo.acao = 5; //modo defesa para vida muito baixa
  }

  switch (inimigo.acao) {
    //Atacar
    case 1:
      let critico = Math.floor(Math.random() * 100) + 1;
      if (critico <= 80) {
        inimigo.atacar();
        console.log("Ele te atacou e te causou " + inimigo.dano + " de dano\n");
      } else {
        inimigo.dano += inimigo.dano;
        inimigo.atacar();
        console.log(
          "Ele te deu um DANO CRÍTICO e te causou " +
            inimigo.dano +
            " de dano\n",
        );
        if (inimigo.verificador_dobro_dano == false) {
          inimigo.dano = 10;
        } else {
          inimigo.dano = 20;
        }
      }
      break;

    //Defender
    case 2:
      inimigo.defesa = Math.floor(Math.random() * 10) + 1;
      inimigo.defender();
      inimigo.modo_defesa = true;
      console.log(
        "Ele preparou sua defesa, se você o atacar na próxima rodada ele irá tomar " +
          inimigo.defesa +
          " de dano a menos\n",
      );
      break;

    //Usar poção
    case 3:
      let pocao = Math.floor(Math.random() * 2) + 1;
      switch (pocao) {
        case 1:
          if (inimigo.verificador_dobro_dano == false && inimigo.qtd_dano > 0) {
            inimigo.dano += inimigo.dano;
            inimigo.contador_dobro_dano = 3;
            inimigo.verificador_dobro_dano = true;
            inimigo.qtd_dano -= 1;
            console.log("\nEle dobrou seu dano com uma poção de Dano\n");
          } else if (inimigo.verificador_dobro_dano == true) {
            console.log(
              "\nEle esqueceu que já estava sob o efeito da poção de duplo dano e tentou tomar outra, perdendo a vez\n",
            );
          } else {
            console.log(
              "Ele não tem mais poções de dobro de dano disponíveis e tentou tomar uma, perdendo a vez",
            );
          }
          break;

        //Poção de cura
        case 2:
          if (inimigo.qtd_cura > 0) {
            inimigo.vida += 5;
            inimigo.qtd_cura -= 1;
            console.log("\nVocê curou 5 de vida\n");
          } else {
            console.log("\nVocê não tem mais poções de cura disponíveis\n");
          }

          break;
      }
      break;

    case 4:
      inimigo.vida += 5;
      inimigo.qtd_cura -= 1;
      console.log("\nEle curou 5 de vida utilizando a poção de cura\n");
      break;
  }
  //Contagem poção de dano do Jogador
  if (jogador.verificador_dobro_dano == true) {
    jogador.contador_dobro_dano -= 1;
    if (jogador.contador_dobro_dano == 0) {
      jogador.verificador_dobro_dano = false;
      jogador.dano = 10;
      console.log("\nAVISO: O EFEITO DA SUA POÇÃO ACABOU!\n");
    }
  }

  //Contagem poção de dano do Inimigo
  if (inimigo.verificador_dobro_dano == true) {
    inimigo.contador_dobro_dano -= 1;
    if (inimigo.contador_dobro_dano == 0) {
      inimigo.verificador_dobro_dano = false;
      inimigo.dano = 10;
      console.log("\nAVISO: O EFEITO DA POÇÃO DO SEU INIMIGO ACABOU!");
    }
  }

  //Remover defesa do Jogador
  if (jogador.modo_defesa == true) {
    jogador.modo_defesa = false;
    jogador.defesa = 0;
  }
  turno += 1;
}
if (jogador.vida > inimigo.vida) {
  console.log("\nMeus Parabéns, Você Venceu!!!!\n");
} else {
  console.log("Você perdeu...");
}

prompt.hide("\nAperte Enter para sair\n");
