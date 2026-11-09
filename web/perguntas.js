// Gerado por gerar_perguntas_js.py — edite perguntas.json, não este arquivo.
window.PERGUNTAS = {
  "category_order": [
    "Distribuição etária",
    "Fecundidade",
    "Natalidade",
    "Mortalidade",
    "População",
    "Capacidade de suporte",
    "Regulação populacional - Defasagem temporal",
    "Regulação populacional - Fatores dependentes da densidade",
    "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
    "Interações com outras espécies - Nicho ecológico e sinantropia",
    "Razão sexual",
    "Crescimento exponencial e logístico",
    "Competição interespecífica"
  ],
  "questions": [
    {
      "id": "q01",
      "category": "Distribuição etária",
      "scenario": "O bando precisa de mais pombos e o Bem-te-vi do bairro anda de olho no seu ninho:",
      "option_a": {
        "label": "Proteger o ninho e chocar ovos",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Não é preciso se preocupar, bem-te-vis e pombos convivem harmoniosamente",
        "effect": "loss",
        "note": null
      },
      "feedback": [
        "Pru-pru... nós pombos buscamos sempre manter uma quantidade maior de indivíduos jovens, é o que permite nosso crescimento populacional. Chamamos isso de Pirâmide Etária de Base Larga.",
        "Pru-pru... disponibilidade de alimentos, presença de predadores, condições sanitárias, tudo isso afeta a pirâmide, para o bem ou para o mal.",
        "Pru-pru... Bem-te-vis são onívoros, isso significa que possuem uma dieta variada, e nessa variedade ovos de pombos podem se tornar iguarias ocasionais. Melhor evitá-los!"
      ],
      "risco": {
        "azar": "Mesmo com o ninho vigiado, o bem-te-vi aproveitou um descuido e levou um ovo.",
        "sorte": "O bem-te-vi achou um lanche mais fácil em outro lugar e deixou os ovos em paz."
      },
      "tier": 0
    },
    {
      "id": "q02",
      "category": "Fecundidade",
      "scenario": "O inverno acabou e os dias estão ficando mais quentes e longos. O que o bando faz?",
      "option_a": {
        "label": "Começou o verão, hora de botar ovos",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Sou um pombo com ascendência europeia, prefiro climas frios",
        "effect": "loss",
        "note": null
      },
      "feedback": [
        "Pru-pru... todas as espécies possuem suas próprias taxas de fecundidade de acordo com o número de ovos ou filhotes gerados em um dado período de tempo.",
        "Pru-pru... muitos fatores estão envolvidos nessa questão: abundância de alimentos com alto teor calórico, clima quente e ameno, disponibilidade de abrigos artificiais, presença de doenças ou parasitas e outras coisinhas também...",
        "Pru-pru... pombos podem por até 4 ovos por ninhada, com duas ou mais posturas por ano. Em ambientes favoráveis, com muito alimento calórico e clima quente, somos capazes de uma taxa de fecundidade maior. Por isso somos o sucesso das cidades!"
      ],
      "tier": 1
    },
    {
      "id": "q03",
      "category": "Fecundidade",
      "scenario": "Chegou a época de pôr ovos e você precisa de um novo abrigo. Voando pela cidade você descobre um abrigo alto e isolado, porém esse lugar já foi habitado antes. É possível ver restos de ninho. O que fazer?",
      "option_a": {
        "label": "Continue a busca, é importante achar um local limpo",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Ficar com o abrigo, já é hora desse lugar ter um novo morador",
        "effect": "loss",
        "note": "local infestado por piolhos e ácaros"
      },
      "feedback": [
        "Pru-pru... nem todas as espécies se reproduzem no mesmo ritmo, cada uma tem uma fecundidade própria, calculada pela quantidade de ovos ou filhotes que consegue gerar ao longo de certo intervalo de tempo.",
        "Pru-pru... a fecundidade não depende de uma coisa só: ela pode variar conforme a oferta de alimentos energéticos, a temperatura do ambiente, a existência de locais seguros para abrigo e até a presença de doenças, parasitas e outros fatores que interferem na reprodução.",
        "Pru-pru... é importante escolher abrigos bem protegidos e limpos. Saúde em primeiro lugar!"
      ],
      "risco": {
        "azar": "A busca demorou e alguns ovos foram postos às pressas num canto improvisado.",
        "sorte": "Por sorte, o ninho velho estava quase sem piolhos e ácaros."
      },
      "tier": 1
    },
    {
      "id": "q04",
      "category": "Natalidade",
      "scenario": "A escolha do abrigo é fundamental. Durante as buscas você encontrou um abrigo no alto do telhado de um galpão, bem pertinho das telhas de zinco. Predadores se manterão longe, mas o lugar parece quente. O que fazer?",
      "option_a": {
        "label": "Continue a busca. É importante achar um local fresco e arejado.",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Ficar com o abrigo. É importante manter os predadores fora.",
        "effect": "loss",
        "note": null
      },
      "feedback": [
        "Pru-pru... natalidade é o “placar de bebês” do bando: mostra quantos pombinhos nascem vivos em certo tempo.",
        "Pru-pru... esse placar sobe ou desce conforme o bando encontra comida, abrigo seguro e boas condições para os filhotes nascerem vivos. Se faltar cuidado ou aparecer doença, predador e perigo no ninho, o placar pode cair.",
        "Pru-pru... é importante escolher abrigos bem protegidos e longe dos perigos urbanos. Mantenha seu placar vitorioso!"
      ],
      "risco": {
        "azar": "O lugar fresco tinha um gato rondando, e um ovo se perdeu.",
        "sorte": "Veio uma semana nublada e o zinco não esquentou tanto."
      },
      "tier": 2
    },
    {
      "id": "q05",
      "category": "Mortalidade",
      "scenario": "Você e seu bando avistam um “banquete lendário” no meio da rua: um saco gigante de salgadinhos aberto, bem na faixa de ônibus. A missão parece fácil — correr, beliscar e sair voando — mas os humanos estão passando apressados, os ônibus não param e um funcionário já vem tentando espantar todo mundo. O que fazer?",
      "option_a": {
        "label": "Esperar a área esvaziar e procurar comida em um lugar mais seguro",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Não há tempo a perder! Invadir a faixa de ônibus em busca dos salgadinhos",
        "effect": "loss",
        "note": "pombos atropelados"
      },
      "feedback": [
        "Pru-pru... mortalidade é como perder vidas no jogo do bando, é o número de pombos que saem da partida em certo tempo.",
        "Pru-pru... comida no papo, clima de boa e menos perigos pelo caminho ajudam o bando a perder menos vidas. Mas, se aparecem doenças, parasitas, predadores ou confusão com humanos, a mortalidade pode subir rapidinho.",
        "Pru-pru... fique longe de carros, você não vai querer ser atropelado!"
      ],
      "risco": {
        "azar": "No lugar seguro a comida era pouca, e os mais fracos passaram fome.",
        "sorte": "O semáforo fechou bem na hora e o bando beliscou sem ninguém se machucar."
      },
      "tier": 3
    },
    {
      "id": "q06",
      "category": "População",
      "scenario": "Uma grande obra começou a dividir o parque onde seu bando vive. Uma parte do parque continua segura e cheia de pombos, enquanto a outra ficou isolada e com poucos indivíduos. O que fazer?",
      "option_a": {
        "label": "Mudar para a área onde existem mais pombos e continuar interagindo com o bando",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Permanecer na área isolada, longe dos outros pombos",
        "effect": "loss",
        "note": "menor interação entre os indivíduos e dificuldade para encontrar parceiros"
      },
      "feedback": [
        "Pru-pru... para sermos considerados uma população, não é só sermos todos pombos!",
        "Pru-pru... nós precisamos fazer parte da mesma espécie, viver em uma área específica e conseguir interagir entre si. Quanto mais pombos conseguirem permanecer próximos e interagir, mais forte será nossa população.",
        "Pru-pru... mudanças no ambiente podem separar o bando, dificultando o contato entre os indivíduos. É importante encontrar locais onde possamos continuar juntos e interagindo!"
      ],
      "tier": 4
    },
    {
      "id": "q07",
      "category": "Capacidade de suporte",
      "scenario": "Foi uma primavera de muitos filhotes e o bando da praça está enorme! Só que o carrinho de pipoca e as migalhas da padaria não alimentam todo mundo. Já tem pombo magrelo brigando por cada pipoquinha e filhote piando de fome. O que fazer?",
      "option_a": {
        "label": "Ficar todo mundo na praça, cada um por si na hora da pipoca",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Formar pequenos grupos de exploração para descobrir novas fontes de comida pelo bairro",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... toda praça tem uma \"lotação máxima\", igual à do elevador do prédio. Chamamos isso de Capacidade de Suporte, ou simplesmente K: o número de pombos que o ambiente consegue alimentar e abrigar por muito tempo.",
        "Pru-pru... quando o bando passa do K, sobra pouca comida para cada um: os filhotes sobrevivem menos, os adultos enfraquecem e a população encolhe até voltar ao tamanho que a praça aguenta. Mas o K não é uma parede! Comida nova empurra ele para cima.",
        "Pru-pru... bando esperto não briga por migalha, descobre padaria nova!"
      ],
      "risco": {
        "azar": "Os grupos de exploração voltaram de mãos vazias desta vez.",
        "sorte": "O pipoqueiro caprichou no dia e sobrou pipoca para todo mundo."
      },
      "tier": 5
    },
    {
      "id": "q08",
      "category": "Capacidade de suporte",
      "scenario": "Onda de calor! A fonte da praça é a única água por perto e virou festa: pombos apertados, água esverdeada e uns colegas com as penas arrepiadas e os olhos lacrimejando. O que fazer?",
      "option_a": {
        "label": "Dividir o bando em grupos menores e beber em poças, goteiras e bebedouros espalhados pelo bairro",
        "effect": "gain",
        "note": null
      },
      "option_b": {
        "label": "Continuar na fonte, porque é fácil e todo mundo já está lá",
        "effect": "loss",
        "note": null
      },
      "feedback": [
        "Pru-pru... já tentou voar contra o vento? Quanto mais forte ele sopra, menos você avança. Na ecologia, esse vento é a Resistência Ambiental: tudo o que segura o crescimento da população, como falta de comida, predadores, clima ruim e doenças.",
        "Pru-pru... e ela aperta mais quando o bando está apertado: quanto mais pombos juntos, mais fácil doenças e parasitas se espalham. Nosso potencial de crescer é enorme, mas é o cabo de guerra com a resistência do ambiente que define o K.",
        "Pru-pru... ninguém merece ser pombo doente na fonte. Espalhe-se (com moderação)!"
      ],
      "risco": {
        "azar": "O sol secou as poças rápido e o bando ficou com sede.",
        "sorte": "Uma chuva de verão lavou a fonte e renovou a água."
      },
      "tier": 5
    },
    {
      "id": "q09",
      "category": "Regulação populacional - Defasagem temporal",
      "scenario": "Faz meses que a comida do bairro está diminuindo. Na chamada da tarde, o pombo mais velho pede um voluntário para descobrir se o bando está bem. Como você vai fazer isso?",
      "option_a": {
        "label": "Contar os pombos adultos: se a praça continua cheia deles, está tudo bem",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Contar quantos filhotes chegam a voar a cada mês: se o número estiver caindo, o alerta acende",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... adultos são como o saldo do banco: mesmo com o salário atrasado, a conta não zera de um dia para o outro. Nós vivemos vários anos, então o bando parece o mesmo mesmo depois que o problema começou.",
        "Pru-pru... quem sente a crise primeiro são os filhotes: sem comida, nascem menos e sobrevivem menos. Contar adultos mostra o passado do bando, contar filhotes mostra o presente.",
        "Pru-pru... quer saber se o bando vai bem? Olhe para os pombinhos!"
      ],
      "tier": 6
    },
    {
      "id": "q10",
      "category": "Regulação populacional - Defasagem temporal",
      "scenario": "O bando bombou nos últimos meses e tinha pombo por todo lado! Agora um casal de falcões acabou de fazer ninho na torre da igreja, bem em frente à praça. Só que a comida está diminuindo e o bando já começou a encolher. O que fazer?",
      "option_a": {
        "label": "Ficar tranquilo: com menos pombos no cardápio, os falcões logo vão embora",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Passar a descansar e dormir em lugares cobertos e escondidos, porque os falcões devem ficar por um tempo mesmo com menos pombos",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... os predadores também têm defasagem! Os falcões chegaram depois da fartura de pombos e vão demorar para ir embora depois que ela acabar, ainda mais com filhotes para alimentar.",
        "Pru-pru... isso pode dar um combo terrível: fome e falcão ao mesmo tempo. A população de predadores sobe e desce atrás da população de presas, sempre um passinho atrasado.",
        "Pru-pru... quando o falcão chegar, olho aberto e poleiro escondido!"
      ],
      "risco": {
        "azar": "Um falcão descobriu o esconderijo e pegou um pombo distraído.",
        "sorte": "Os falcões foram caçar em outra praça por uns dias."
      },
      "tier": 6
    },
    {
      "id": "q11",
      "category": "Regulação populacional - Defasagem temporal",
      "scenario": "A feirinha voltou para o bairro e tem comida espalhada pela praça toda! Mas o bando continua encolhendo: nasceram poucos filhotes na época da fome e vários pombos velhinhos estão partindo. Um pombo pessimista grita: \"Essa praça está amaldiçoada, vamos embora!\" O que fazer?",
      "option_a": {
        "label": "Concordar e partir em busca de outra praça: se o bando ainda está encolhendo, é sinal de que aqui continua ruim",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Ficar, cuidar dos ninhos e ter paciência: a comida voltou, o bando só vai reagir daqui a um tempo",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... a defasagem funciona nos dois sentidos! A população demora para sentir a comida acabar e também demora para sentir a comida voltar. O ovo leva uns 18 dias para chocar, o filhote leva cerca de um mês para voar e uns 6 meses para ter os próprios ovos.",
        "Pru-pru... por isso o tamanho do bando hoje mostra o que aconteceu meses atrás, e não como a praça está agora.",
        "Pru-pru... nem todo problema se resolve voando para longe. Às vezes o segredo é ficar e chocar!"
      ],
      "tier": 6
    },
    {
      "id": "q12",
      "category": "Regulação populacional - Defasagem temporal",
      "scenario": "A feira livre que deixava tanta comida no chão da praça acabou de mudar de bairro! Só que o bando ainda está gordinho e feliz, e tem ovos chocando nos ninhos, ou seja, logo vão aparecer bocas famintas. O que fazer?",
      "option_a": {
        "label": "Relaxar: o bando está ótimo e a fome ainda não chegou, dá pra resolver depois",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Começar já a procurar comida nova pelo bairro, pensando nos filhotes que estão chegando",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... a população é como um caminhão: mesmo depois de tirar o pé do acelerador, ele ainda anda um pouco. Quando a comida diminui, os ovos já postos continuam nascendo e o bando cresce mais um tempo. Chamamos isso de Defasagem Temporal: o ambiente muda hoje, mas a população só responde depois.",
        "Pru-pru... o perigo é o bando crescer justamente quando a comida está acabando, e aí a fome vem pesada.",
        "Pru-pru... quem só se preocupa quando a barriga ronca já chegou atrasado. Pense nos ovos de hoje, que são os famintos de amanhã!"
      ],
      "tier": 6
    },
    {
      "id": "q13",
      "category": "Regulação populacional - Fatores dependentes da densidade",
      "scenario": "Uma padaria nova abriu no bairro vizinho e metade do bando se mudou para lá. Na praça sobraram poucos pombos, todo mundo junto e se vendo todo dia. Agora tem comida de sobra e ninho vago em cada beiral, mas alguns pombos preocupados dizem: \"Bando pequeno é bando frágil\". O que fazer?",
      "option_a": {
        "label": "Ficar quietinho, economizar energia e só botar ovos quando o bando voltar ao tamanho de antes",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Aproveitar a folga: com comida e ninho sobrando, é hora de caprichar nas ninhadas",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... os fatores dependentes da densidade funcionam nos dois sentidos! Quando o bando encolhe, sobra comida e ninho para cada um, a briga diminui e as doenças se espalham mais devagar. Nascem mais filhotes e mais deles sobrevivem.",
        "Pru-pru... é assim que o bando se regula sozinho: se aperta demais, o crescimento freia. Se sobra espaço, o crescimento acelera, como um elástico que sempre volta para o tamanho que a praça aguenta.",
        "Pru-pru... pouco pombo e muita comida? Bora botar ovos!"
      ],
      "tier": 7
    },
    {
      "id": "q14",
      "category": "Regulação populacional - Fatores dependentes da densidade",
      "scenario": "Dois banquetes apareceram ao mesmo tempo! No calçadão, uma pilha gigante de pão de padaria, mas está uma muvuca: é pombo empurrando, bicando e brigando por cada pedacinho. Nos fundos da praça, uma pilha bem menor de milho, com só alguns pombos comendo sossegados. Para onde você vai?",
      "option_a": {
        "label": "Calçadão! Pilha grande é sinônimo de barriga cheia",
        "effect": "loss",
        "note": "são bicos demais dividindo a pilha, então cada pombo sai com farelinho e ainda leva bicada"
      },
      "option_b": {
        "label": "Fundos da praça: a pilha é menor, mas rende mais comida por pombo",
        "effect": "gain",
        "note": "cada pombo come bem e tem energia de sobra para ovos e filhotes"
      },
      "feedback": [
        "Pru-pru... quando um pombo disputa comida com outro pombo, isso se chama Competição Intraespecífica. \"Intra\" quer dizer \"dentro\": a briga acontece dentro da mesma espécie. Todo mundo ali come as mesmas coisas e quer a mesma pilha, então ninguém leva vantagem, só divide.",
        "Pru-pru... e essa briga pesa mais quando tem pombo demais junto! Quanto mais bicos na mesma pilha, menos sobra para cada um. Por isso ela é um Fator Dependente da Densidade (densidade é quantos pombos cabem num pedaço de chão). No aperto, cada pombo fica magrinho, bota menos ovos e os filhotes crescem fracos.",
        "Pru-pru... antes de mergulhar na pilha, conte os bicos!"
      ],
      "risco": {
        "azar": "Um bando vizinho descobriu o milho e dividiu a pilha.",
        "sorte": "O bando chegou cedo ao calçadão, antes da muvuca."
      },
      "tier": 7
    },
    {
      "id": "q15",
      "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
      "scenario": "Chegou a hora de escolher onde fazer o ninho. Você achou um beiral baixinho, pertinho do chão e das migalhas, fácil de alcançar. Também achou uma marquise alta, com um cantinho escondido, que dá mais trabalho para chegar. O que fazer?",
      "option_a": {
        "label": "Beiral baixinho: comida perto e acesso fácil",
        "effect": "loss",
        "note": "gatos e ratos alcançam o ninho, e ovos e filhotes viram lanche"
      },
      "option_b": {
        "label": "Marquise alta e escondida: dá mais trabalho, mas os predadores não chegam",
        "effect": "gain",
        "note": "mais ovos viram filhotes que chegam a voar"
      },
      "feedback": [
        "Pru-pru... a Qualidade do Habitat é o quanto um lugar ajuda a gente a sobreviver e criar filhotes. Lugar fácil demais para nós também é fácil para os predadores!",
        "Pru-pru... perto do chão, gatos e ratos chegam ao ninho. Lá no alto e escondido, mais filhotes chegam a voar.",
        "Pru-pru... ninho seguro vale mais que ninho pertinho. Asas servem para isso!"
      ],
      "risco": {
        "azar": "Uma ventania forte derrubou um ovo da marquise.",
        "sorte": "Nenhum gato ou rato passou por ali nesta temporada."
      },
      "tier": 8
    },
    {
      "id": "q16",
      "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
      "scenario": "Você ouviu falar de dois lugares. O forro do mercado é famoso: comida farta e pombo chegando toda semana, mas os ratos atacam os ninhos e muitas ninhadas se perdem. A marquise da biblioteca não tem fama e tem comida só na medida, mas quase todos os filhotes crescem e voam. Qual escolher?",
      "option_a": {
        "label": "Forro do mercado: comida farta e o point do bairro",
        "effect": "loss",
        "note": "o lugar parece cheio só porque chegam pombos de fora, enquanto as ninhadas se perdem"
      },
      "option_b": {
        "label": "Marquise da biblioteca: comida na medida e filhotes seguros",
        "effect": "gain",
        "note": "nascem mais filhotes do que morrem, e sobram jovens para outros lugares"
      },
      "feedback": [
        "Pru-pru... nem todo lugar cheio é lugar bom! O habitat onde nascem mais pombos do que morrem é uma Fonte, e onde morrem mais do que nascem é um Sumidouro.",
        "Pru-pru... o sumidouro só parece lotado porque pombos de fora não param de chegar. A fonte manda filhotes para a cidade toda.",
        "Pru-pru... não se deixe levar pela fama: olhe quantos filhotes voam, não quantos pombos chegam!"
      ],
      "tier": 8
    },
    {
      "id": "q17",
      "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
      "scenario": "Vem aí uma frente fria com chuva e vento forte, bem na época dos ovos! Você está escolhendo entre um beiral estreito e aberto, com vista linda e sol da manhã, e um cantinho fundo debaixo de uma marquise larga, protegido do vento e da chuva. O que fazer?",
      "option_a": {
        "label": "Beiral aberto, com vista e sol da manhã",
        "effect": "loss",
        "note": "a chuva molha os ovos, o vento esfria os filhotes e a ninhada se perde"
      },
      "option_b": {
        "label": "Cantinho fundo sob a marquise larga",
        "effect": "gain",
        "note": "seco e abrigado, os ovos ficam aquecidos e os filhotes sobrevivem"
      },
      "feedback": [
        "Pru-pru... chuva, vento e frio pegam todo mundo igual, não importa quantos pombos tem por perto. São os Fatores Independentes da Densidade.",
        "Pru-pru... a gente não controla o tempo, mas escolhe onde ficar. Marquises e forros funcionam como guarda-chuva e amortecem o clima ruim.",
        "Pru-pru... vista bonita não choca ovo. Guarda-chuva bom, sim!"
      ],
      "risco": {
        "azar": "A chuva veio de lado e molhou até o cantinho abrigado.",
        "sorte": "A frente fria mudou de rumo e passou longe do bairro."
      },
      "tier": 8
    },
    {
      "id": "q18",
      "category": "Espaço e metapopulações - Fragmentação e qualidade do habitat urbano",
      "scenario": "Você achou o abrigo dos sonhos: forro seco, protegido e sem predadores! Só que ele fica num bairro de prédios de vidro e ruas limpinhas, sem uma migalha e sem água, e tudo fica bem longe. Outro lugar, um beiral apenas razoável, fica pertinho de uma padaria e de uma fonte. O que fazer?",
      "option_a": {
        "label": "Abrigo dos sonhos: é o melhor da cidade!",
        "effect": "loss",
        "note": "falta comida, os pais enfraquecem e os filhotes não crescem"
      },
      "option_b": {
        "label": "Beiral razoável perto de comida e água",
        "effect": "gain",
        "note": "os recursos estão juntos, os pais se alimentam e criam filhotes fortes"
      },
      "feedback": [
        "Pru-pru... um bom habitat precisa de vários recursos juntos: abrigo, comida e água. O que estiver mais em falta manda no jogo, e ele se chama Fator Limitante.",
        "Pru-pru... na cidade cortada em pedaços, esses recursos ficam separados, e voar de um a outro gasta energia que devia ir para os filhotes.",
        "Pru-pru... abrigo perfeito de barriga vazia não sustenta ninguém. Procure o pacote completo!"
      ],
      "tier": 8
    },
    {
      "id": "q19",
      "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
      "scenario": "O outono chegou e as sementes que o bando adora estão acabando, porque as árvores da praça já soltaram tudo. No chão da calçada tem migalhas de pão, pedacinhos de fruta e até insetinhos nas frestas. Alguém do bando avisa: \"Pombo que se preze só come sementes!\" O que fazer?",
      "option_a": {
        "label": "Esperar a próxima temporada de sementes: pombo que se preze só come sementes",
        "effect": "loss",
        "note": null
      },
      "option_b": {
        "label": "Aceitar o cardápio da cidade: migalhas, frutinhas caídas e o que mais aparecer",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... Nicho Ecológico é o \"emprego\" de uma espécie na natureza: o que ela come, onde vive e como se vira.",
        "Pru-pru... nosso nicho é amplo: comemos de tudo um pouco, mas sementes são a nossa base. Quem só come uma coisa, o especialista, sofre quando ela acaba.",
        "Pru-pru... cardápio de um prato só é furada. Quem topa tudo nunca fica sem jantar!"
      ],
      "tier": 9
    },
    {
      "id": "q20",
      "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
      "scenario": "Uma turma do bando anda cansada da vida na cidade, com tanto barulho, gente e ônibus. Ouviram falar de uma mata grande e silenciosa, bem longe, sem carros nem humanos por perto. O que fazer?",
      "option_a": {
        "label": "Mudar para a mata: a natureza é o lugar de verdade do pombo, sem confusão",
        "effect": "loss",
        "note": "falta comida do tipo que o bando aproveita e faltam paredões para ninho, então o bando passa aperto"
      },
      "option_b": {
        "label": "Continuar na cidade, aproveitando a comida e os abrigos que os humanos deixam por aí",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... somos sinantrópicos, ou seja, nos damos bem vivendo junto dos humanos.",
        "Pru-pru... eles deixam comida fácil e constroem prédios cheios de cantinhos para ninho, enquanto a mata fechada quase não tem paredões nem sementes no chão.",
        "Pru-pru... barulho de cidade é um preço pequeno para tanta mordomia. Cidade grande, bando feliz!"
      ],
      "tier": 9
    },
    {
      "id": "q21",
      "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
      "scenario": "Você é um pombo jovem e vai escolher o lugar do primeiro ninho. No parque tem galhos finos de árvore, que balançam ao vento e é onde muito passarinho faz ninho. Num prédio antigo tem uma reentrância funda e seca numa parede bem alta. O que fazer?",
      "option_a": {
        "label": "Galho da árvore: passarinho faz ninho em árvore!",
        "effect": "loss",
        "note": "o galho balança, o ninho fica exposto ao vento, à chuva e aos predadores, e poucos ovos viram filhotes"
      },
      "option_b": {
        "label": "Reentrância da parede do prédio: você já viu ninho de pombo?",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... o nosso nicho, ou jeito de viver, vem de longe: nossos ancestrais faziam ninho em falésias, paredões de pedra altos e secos.",
        "Pru-pru... prédios são falésias de concreto, e por isso nos demos tão bem nas cidades. Galho fino balançando não combina com a gente.",
        "Pru-pru... prédio é penhasco com elevador. Só falta a vista para o mar!"
      ],
      "tier": 9
    },
    {
      "id": "q22",
      "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
      "scenario": "O inverno chegou com noites geladas. Na praça tem galhos de árvore com vento úmido. Na parede de uma padaria, uma saída morna de ar do forno deixa um cantinho aquecido a noite toda. Alguém do bando acha esquisito dormir perto de uma máquina. O que fazer?",
      "option_a": {
        "label": "Dormir na árvore: parece o lugar mais natural e livre de máquinas",
        "effect": "loss",
        "note": "a noite gelada gasta muita energia do corpo, e os mais fracos não aguentam"
      },
      "option_b": {
        "label": "Dormir no cantinho morninho ao lado da saída de ar da padaria",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... a cidade é mais quentinha que o campo, por causa de prédios, asfalto e máquinas. Esse calor extra é um recurso a mais para quem vive junto dos humanos.",
        "Pru-pru... no frio, o corpo gasta muita energia só para se aquecer, então dormir no calorzinho poupa comida e ajuda a passar o inverno.",
        "Pru-pru... quem disse que forno de padaria não serve para nada? É a lareira do pombo!"
      ],
      "risco": {
        "azar": "A padaria fechou no feriado e a saída de ar esfriou.",
        "sorte": "A noite foi bem menos fria do que parecia."
      },
      "tier": 9
    },
    {
      "id": "q23",
      "category": "Interações com outras espécies - Nicho ecológico e sinantropia",
      "scenario": "Duas fontes de comida apareceram. Uma é uma lixeira aberta e transbordando, com restos de vários dias, comida amolecida e cheirando mal. A outra é um canteiro com sementes e migalhas de pão fresco espalhadas pelo chão. Alguém do bando lembra: \"Onívoro come de tudo, então a lixeira serve!\" O que fazer?",
      "option_a": {
        "label": "Lixeira: fartura à vontade, e onívoro come de tudo",
        "effect": "loss",
        "note": "a comida estragada causa doenças e a mortalidade sobe"
      },
      "option_b": {
        "label": "Canteiro: sementes e migalhas frescas",
        "effect": "gain",
        "note": null
      },
      "feedback": [
        "Pru-pru... somos onívoros: comemos sementes, frutinhas e até insetinhos. Ser onívoro é ter um cardápio grande, não aceitar qualquer coisa.",
        "Pru-pru... comida estragada tem fungos e bactérias que causam doenças, e doença faz a mortalidade subir. Nicho amplo também tem limites!",
        "Pru-pru... onívoro come de tudo, mas de tudo que presta. Se parece esquisito, dê meia-volta!"
      ],
      "risco": {
        "azar": "Um cachorro espantou o bando do canteiro antes de comerem.",
        "sorte": "A lixeira tinha acabado de receber comida fresca."
      },
      "tier": 9
    },
    {
      "id": "q24",
      "category": "Fecundidade",
      "scenario": "Um casal de primeira viagem perdeu os ovos logo na primeira tentativa: uma ventania derrubou o ninho. Um amigo desanimado comenta: “Se não deu certo logo na primeira vez, é sinal de que a gente não nasceu pra isso.” Ainda tem comida de sobra e muita temporada pela frente. O que fazer?",
      "option_a": {
        "label": "Desistir de reproduzir nessa temporada, achando que o casal não leva jeito",
        "effect": "loss",
        "note": "sem novas tentativas, o casal não deixa filhote nenhum no ano"
      },
      "option_b": {
        "label": "Refazer o ninho num lugar mais protegido e botar de novo",
        "effect": "gain",
        "note": "a postura é reposta e a nova tentativa tem chance de dar certo"
      },
      "feedback": [
        "Pru-pru... perder ovos não encerra a temporada! Como nos reproduzimos o ano todo, o casal pode repor a postura e tentar de novo.",
        "Pru-pru... uma ninhada perdida não é sentença: com comida e abrigo bom, as próximas podem dar certo. É assim que a Fecundidade se recupera.",
        "Pru-pru... ninho que cai é como bicicleta que tomba: levanta, sacode a poeira e pedala!"
      ],
      "tier": 1
    },
    {
      "id": "q25",
      "category": "Fecundidade",
      "scenario": "Você nasceu num prédio onde moram muitos pombos, e cada beiral está apertado. Agora, crescido e pronto para formar par, um conhecido conta que num prédio mais afastado tem menos movimento e beiral vago. Mas ficar na casa da família parece mais seguro, afinal é tudo o que você conhece. Onde fazer o primeiro ninho?",
      "option_a": {
        "label": "Ficar no prédio onde nasceu, com a família e o que já conhece",
        "effect": "loss",
        "note": "na colônia lotada, mais ovos se perdem e menos filhotes crescem"
      },
      "option_b": {
        "label": "Mudar para o prédio mais vazio e fazer o ninho lá",
        "effect": "gain",
        "note": "com menos aperto, mais ovos viram filhotes que voam"
      },
      "feedback": [
        "Pru-pru... quando um jovem deixa o lugar onde nasceu para fazer ninho em outro, isso se chama Dispersão.",
        "Pru-pru... em colônia lotada, mais ovos quebram e menos filhotes crescem. Em estudos, jovens que se mudam para colônias mais vazias criam filhotes com mais sucesso.",
        "Pru-pru... casa de família é boa, mas espaço também vale ouro. Ninho com folga, filhote feliz!"
      ],
      "tier": 1
    },
    {
      "id": "q26",
      "category": "Fecundidade",
      "scenario": "A comida diminuiu faz semanas, mas a fêmea ainda se sente com energia para botar novos ovos. Um pombo otimista diz: “Botar ovo é fácil, é só ir botando que a comida volta.” Só que o casal já tem filhotes no ninho, crescendo rápido e sempre com fome. Segue o plano?",
      "option_a": {
        "label": "Seguir botando ovos novos, porque botar é fácil e a comida deve voltar",
        "effect": "loss",
        "note": "os ovos até chocam, mas falta comida para criar os filhotes, e muitos morrem no ninho"
      },
      "option_b": {
        "label": "Segurar os ovos novos e guardar a comida para os filhotes que já estão no ninho",
        "effect": "gain",
        "note": "os filhotes atuais recebem o que precisam para crescer e chegar a voar"
      },
      "feedback": [
        "Pru-pru... ter filhote custa energia, o chamado Custo Reprodutivo. E a parte cara não é botar o ovo, é criar o filhote.",
        "Pru-pru... quando falta comida, os ovos ainda chocam, mas muitos filhotes não aguentam a criação e menos pombos chegam a voar.",
        "Pru-pru... melhor criar bem os filhotes que já nasceram do que ganhar mais bocas para alimentar!"
      ],
      "tier": 1
    },
    {
      "id": "q27",
      "category": "Fecundidade",
      "scenario": "A comida está boa e os beirais estão livres desde cedo na temporada, mas quase ninguém começou a botar. “A gente sempre espera o pico da primavera, quando todo mundo começa junto”, dizem os mais tradicionais. Um casal pensa em começar logo. Começar agora ou acompanhar a multidão?",
      "option_a": {
        "label": "Esperar o pico da primavera, junto com todo mundo",
        "effect": "loss",
        "note": "a temporada do casal fica curta, e as ninhadas que começam tarde criam menos descendentes"
      },
      "option_b": {
        "label": "Começar já, assim que tem comida e ninho bom",
        "effect": "gain",
        "note": "a temporada se alonga e cabem mais ninhadas no ano"
      },
      "feedback": [
        "Pru-pru... a Temporada Reprodutiva é o período em que o casal cria filhotes. A nossa é bem longa: criamos o ano todo, com pico na época mais quente.",
        "Pru-pru... casais que começam cedo e param tarde fazem mais ninhadas, e mais filhotes deles chegam a virar reprodutores.",
        "Pru-pru... quem chega cedo pega o ninho e a comida. Seja pontual!"
      ],
      "tier": 1
    },
    {
      "id": "q28",
      "category": "Fecundidade",
      "scenario": "A fêmea precisa se preparar para botar. Atrás da padaria tem pão de sobra, fácil de pegar. No canteiro da praça tem sementes e grãos variados, que dão mais trabalho para juntar. Um pombo diz: “Comida é comida: barriga cheia bota ovo.” Qual cardápio escolher?",
      "option_a": {
        "label": "Pão à vontade, fácil e que enche a barriga",
        "effect": "loss",
        "note": "o pão dá energia, mas é um cardápio incompleto, e a fêmea não recebe tudo o que precisa para botar bem e criar filhotes fortes"
      },
      "option_b": {
        "label": "Sementes e grãos variados do canteiro",
        "effect": "gain",
        "note": "um cardápio mais completo ajuda a fêmea a botar bem e a criar filhotes fortes"
      },
      "feedback": [
        "Pru-pru... para ter boa Fecundidade, não basta encher a barriga: a comida também precisa ser de qualidade.",
        "Pru-pru... pão dá energia, mas é um cardápio incompleto. Sementes e grãos variados são a nossa comida de verdade.",
        "Pru-pru... barriga cheia nem sempre é barriga bem alimentada. Capriche no cardápio!"
      ],
      "tier": 1
    },
    {
      "id": "q29",
      "category": "Natalidade",
      "scenario": "O casal escolheu um canto bom no beiral, mas o ninho está bem frouxo: um montinho solto de gravetos, sem fundo definido. Quando o ovo é posto, ele rola para perto da borda. Um pombo mais velho dá de ombros: “Ninho de pombo é simples mesmo, nunca precisou de capricho.” Vale caprichar mais no ninho?",
      "option_a": {
        "label": "Deixar o ninho do jeito que está, porque ninho de pombo é simples mesmo",
        "effect": "loss",
        "note": "os ovos rolam para fora ou esfriam, e muitos nunca chegam a eclodir"
      },
      "option_b": {
        "label": "Juntar mais material e ajeitar uma cavidade no meio do ninho para os ovos ficarem no lugar",
        "effect": "gain",
        "note": "os ovos ficam aquecidos e protegidos, e mais deles chegam a eclodir"
      },
      "feedback": [
        "Pru-pru... Natalidade é o número de filhotes que nascem vivos, e para nascer o ovo precisa ficar quentinho e no lugar.",
        "Pru-pru... nosso ninho é mesmo simples, mas se o ovo rola ou esfria, o filhote não nasce. Um ninho mais firme poupa muitos ovos.",
        "Pru-pru... simples não é sinônimo de desleixado. Capriche na caminha dos ovos!"
      ],
      "tier": 2
    },
    {
      "id": "q30",
      "category": "Natalidade",
      "scenario": "Já passou bem do prazo de 18 a 20 dias de choco, e o ovo continua parado e quietinho. O casal se dedicou tanto a ele que parece triste desistir agora. “Já chocamos tanto, não custa esperar só mais um pouquinho”, diz um deles. O que fazer?",
      "option_a": {
        "label": "Continuar chocando “só mais um pouquinho”, já que investiram tanto tempo nesse ovo",
        "effect": "loss",
        "note": "o ovo não vai eclodir, e o casal perde tempo que poderia usar numa nova ninhada"
      },
      "option_b": {
        "label": "Aceitar que o ovo não vai eclodir e recomeçar com uma nova postura",
        "effect": "gain",
        "note": "o casal volta a produzir ovos que podem eclodir e dar novos filhotes"
      },
      "feedback": [
        "Pru-pru... só entra na Natalidade quem nasce vivo, e o ovo de pombo costuma chocar em 18 a 20 dias.",
        "Pru-pru... passou muito do prazo e nada? Provavelmente o ovo não é viável. Insistir é gastar tempo que daria para recomeçar.",
        "Pru-pru... quem insiste num ovo parado perde a chance de ter outros. Bola pra frente!"
      ],
      "tier": 2
    },
    {
      "id": "q31",
      "category": "Natalidade",
      "scenario": "O bando quer saber quantos filhotes nascem por ano para planejar ninhos e comida. Um pombo sugere: “Basta contar os nascimentos do mês mais movimentado da primavera e multiplicar por doze.” Outro lembra que pombo bota ovos o ano todo, mas com altos e baixos. Como estimar?",
      "option_a": {
        "label": "Contar só no mês de pico e multiplicar por doze",
        "effect": "loss",
        "note": "a conta superestima os nascimentos do ano, e o bando planeja ninhos e comida para mais filhotes do que realmente nascem"
      },
      "option_b": {
        "label": "Acompanhar os nascimentos ao longo de vários meses do ano",
        "effect": "gain",
        "note": "a conta fica mais realista, e o bando se prepara na medida certa"
      },
      "feedback": [
        "Pru-pru... Natalidade é sempre “nascimentos por unidade de tempo”: por mês, por ano. A unidade de tempo importa!",
        "Pru-pru... a gente bota ovos o ano todo, mas com mais ninhadas na época quente. Contar só o pico exagera o ano inteiro.",
        "Pru-pru... multiplicar o melhor mês é chute otimista. Acompanhe o ano todo!"
      ],
      "tier": 2
    },
    {
      "id": "q32",
      "category": "Natalidade",
      "scenario": "Depois de uma temporada boa, a praça está cheia de filhotes recém-saídos do ninho. Um pombo faz as contas: “Quanto mais pombos na praça, mais nascimentos no mês que vem!” O bando quer saber quantos nascimentos esperar para preparar os ninhos. Quem deve entrar na conta?",
      "option_a": {
        "label": "Contar todos os pombos da praça, inclusive os filhotes que acabaram de sair do ninho",
        "effect": "loss",
        "note": "filhote ainda não reproduz, então a conta superestima os nascimentos e o bando prepara ninhos que ninguém vai usar tão cedo"
      },
      "option_b": {
        "label": "Contar principalmente os adultos que já têm par e ninho",
        "effect": "gain",
        "note": "são eles que botam os ovos dos próximos nascimentos, e a conta fica mais próxima da realidade"
      },
      "feedback": [
        "Pru-pru... quem faz a Natalidade são os adultos que reproduzem. Filhote recém-saído ainda não bota ovo: só começa com uns cinco meses ou mais.",
        "Pru-pru... por isso o tamanho do bando e a Natalidade nem sempre andam juntos. O que conta é a Estrutura Etária: quantos estão na idade certa de reproduzir.",
        "Pru-pru... contar penas não é contar ninhos. Conte quem de fato reproduz!"
      ],
      "tier": 2
    },
    {
      "id": "q33",
      "category": "Natalidade",
      "scenario": "Todo casal sonha com o ninho perfeito: seco, quentinho, protegido, perto de comida e água. Um pombo exigente recusa todos os cantos “bons o bastante” e espera aparecer o ninho dos sonhos. “Natalidade boa só em condição perfeita”, ele repete. Vale esperar o ninho perfeito?",
      "option_a": {
        "label": "Esperar o ninho perfeito, recusando os cantos “bons o bastante”",
        "effect": "loss",
        "note": "o ninho perfeito quase nunca aparece, e a espera custa semanas de ovos que poderiam estar eclodindo"
      },
      "option_b": {
        "label": "Ficar com um canto bom o bastante, seco e protegido, e começar logo",
        "effect": "gain",
        "note": "o casal começa a ninhada sem demora, e os nascimentos chegam mais cedo"
      },
      "feedback": [
        "Pru-pru... a Natalidade que a gente consegue na vida real quase sempre fica abaixo da máxima possível. Ambiente perfeito não existe.",
        "Pru-pru... lugar bom o bastante já faz os ovos eclodirem. Cada semana de espera é um nascimento que deixa de acontecer.",
        "Pru-pru... melhor um ninho bom hoje do que um perfeito que nunca vem!"
      ],
      "tier": 2
    },
    {
      "id": "q34",
      "category": "Mortalidade",
      "scenario": "Um carcará anda rondando o bairro. Na praça, o bando come junto, fazendo barulho e alvoroço. Um pombo comenta: “Bando grande chama atenção. Sozinho, eu passo despercebido no meio da paisagem.” Onde comer?",
      "option_a": {
        "label": "Comer sozinho num canto afastado, para não chamar atenção",
        "effect": "loss",
        "note": "sozinho, o pombo demora mais a ver o falcão e é o alvo mais fácil"
      },
      "option_b": {
        "label": "Comer junto do bando, de olho na movimentação dos outros",
        "effect": "gain",
        "note": "com mais olhos vigiando, o falcão é visto mais cedo e fica mais difícil capturar alguém"
      },
      "feedback": [
        "Pru-pru... Mortalidade é a taxa de pombos que morrem em certo tempo, e uma das causas é a predação.",
        "Pru-pru... em bando, sempre tem alguém que vê o predador primeiro e dispara a fuga de todo mundo.",
        "Pru-pru... quem anda sozinho não é discreto, é desprotegido. Bando é o melhor alarme!"
      ],
      "tier": 3
    },
    {
      "id": "q35",
      "category": "Mortalidade",
      "scenario": "Você acabou de sair do ninho e já está atrás de comida. No centro da praça, os adultos cercam uma pilha de pipoca, empurrando e bicando. Nas beiradas, só tem migalhas espalhadas. Um colega jovem anima: “Quem não arrisca não petisca! Vamos direto na pilha!” Vale arriscar?",
      "option_a": {
        "label": "Ir direto na pilha do centro e disputar com os adultos",
        "effect": "loss",
        "note": "os adultos dominam, o jovem leva bicadas, come pouco e enfraquece, ficando mais exposto à fome e às doenças"
      },
      "option_b": {
        "label": "Catar as migalhas das beiradas e observar de onde os adultos tiram comida",
        "effect": "gain",
        "note": "o jovem come sem briga e aprende onde há comida"
      },
      "feedback": [
        "Pru-pru... a Mortalidade muda com a idade: nos pombos de cidade, os jovens morrem mais que os adultos.",
        "Pru-pru... jovem ainda não sabe achar comida e perde a disputa para adulto. Em estudos, isso ajuda a explicar por que tantos jovens passam fome e adoecem.",
        "Pru-pru... coragem é bom, mas observar antes de brigar é melhor!"
      ],
      "tier": 3
    },
    {
      "id": "q36",
      "category": "Mortalidade",
      "scenario": "O bando compara dois bairros. No bairro grande, morrem muitos pombos todo mês, mas vive lá uma colônia enorme, e só uma pequena parte dela morre. No bairro pequeno, morrem poucos pombos, mas a colônia é minúscula, e uma parte grande dela some todo mês. Um pombo conclui: “Onde morrem mais pombos é onde está o perigo.” Qual bairro é mais perigoso para viver?",
      "option_a": {
        "label": "Fugir do bairro grande, onde morrem mais pombos",
        "effect": "loss",
        "note": "a taxa de mortalidade lá é menor, e quem foge troca um lugar mais seguro por um mais arriscado"
      },
      "option_b": {
        "label": "Ficar no bairro grande, onde a parte do bando que morre é menor",
        "effect": "gain",
        "note": "o que importa é a proporção de pombos que morre, e não o total de mortes"
      },
      "feedback": [
        "Pru-pru... Taxa de Mortalidade é a parte da população que morre em certo tempo, e não o total de mortes.",
        "Pru-pru... colônia grande tem muitas mortes até quando é segura, só porque tem muito pombo. O que importa é a fatia do bando que se perde.",
        "Pru-pru... número grande assusta, mas é a proporção que conta. Faça a conta direito!"
      ],
      "tier": 3
    },
    {
      "id": "q37",
      "category": "Crescimento exponencial e logístico",
      "scenario": "O bando descobriu um terreno recém-limpo, cheio de vegetação e sementes, com pouquíssimo pombo disputando. Um pombo mais cauteloso acha melhor ir com calma e poupar energia, com medo de a fartura não durar. O que fazer?",
      "option_a": {
        "label": "Ir com calma, poupando energia e reproduzindo pouco, por precaução",
        "effect": "loss",
        "note": "não há disputa nenhuma ainda, e o bando perde a janela de fartura à toa"
      },
      "option_b": {
        "label": "Aproveitar a fartura e reproduzir bastante, sem medo",
        "effect": "gain",
        "note": "com pouca gente e muita comida, o crescimento pode acelerar sem custo"
      },
      "feedback": [
        "Pru-pru... quando tem pouco pombo e comida de sobra, a população cresce rápido e sem freio. Isso é Crescimento Exponencial.",
        "Pru-pru... aqui ainda não tem ninguém disputando nada, então não existe motivo pra pisar no freio.",
        "Pru-pru... economizar energia é ótimo quando o espaço aperta. Com fartura, é hora de acelerar!"
      ],
      "tier": 5
    },
    {
      "id": "q38",
      "category": "Crescimento exponencial e logístico",
      "scenario": "Nos últimos tempos, cada ninhada traz menos filhote novo voando do que antes. Um pombo mais novo acha que o bando está sumindo e quer fugir para outra praça. Um pombo mais velho diz que isso é esperado, porque a praça está perto do limite que aguenta. O que fazer?",
      "option_a": {
        "label": "Fugir para outra praça, assustado com a desaceleração",
        "effect": "loss",
        "note": "abandona comida e abrigo que ainda sustentam bem o bando, só porque o ritmo ficou mais devagar"
      },
      "option_b": {
        "label": "Ficar, porque desacelerar não é o mesmo que encolher",
        "effect": "gain",
        "note": "o bando continua crescendo, só que mais devagar, perto do tamanho máximo que a praça aguenta"
      },
      "feedback": [
        "Pru-pru... perto do limite da praça, o Crescimento Logístico desacelera, só isso.",
        "Pru-pru... desacelerar não é o mesmo que encolher! A população ainda cresce, só que mais devagar.",
        "Pru-pru... indo mais devagar, também se chega lá. Nem toda calmaria é alarme!"
      ],
      "tier": 5
    },
    {
      "id": "q39",
      "category": "Crescimento exponencial e logístico",
      "scenario": "Dois grupos de pombos colonizaram dois lugares diferentes ao mesmo tempo, os dois com pouca gente e bastante comida no início. Depois de um tempo, os dois bandos cresceram quase igual, rapidinho. Só que um lugar é um terreno pequeno ao lado de um estacionamento, e o outro é um parque enorme. Se os dois começaram do mesmo jeito, há por que esperar que seja diferente depois? O que fazer?",
      "option_a": {
        "label": "Manter o mesmo ritmo de reprodução que o bando do parque grande, já que o começo foi parecido",
        "effect": "loss",
        "note": "o terreno pequeno enche bem antes do parque, e o excesso de ninhada gera disputa e perde filhotes"
      },
      "option_b": {
        "label": "Ir ajustando o ritmo aos poucos, de olho no tamanho do próprio lugar, sem se basear no bando vizinho",
        "effect": "gain",
        "note": "o bando cresce de acordo com o que o terreno realmente aguenta, sem desperdiçar ninhada"
      },
      "feedback": [
        "Pru-pru... dois bandos podem começar crescendo parecido, mas isso não quer dizer que vão continuar iguais.",
        "Pru-pru... o lugar pequeno enche logo e o Crescimento Logístico freia mais cedo. O lugar grande aguenta acelerar por mais tempo.",
        "Pru-pru... cada bando tem seu próprio limite. Compare com o próprio terreno, não com o do vizinho!"
      ],
      "tier": 5
    },
    {
      "id": "q40",
      "category": "Competição interespecífica",
      "scenario": "Debaixo de uma árvore caiu um sanduíche amassado: migalhas minúsculas se espalharam ao redor, e um bando de pardais já está em cima delas, rápido e ligeiro. No meio, sobraram pedaços grandes demais para o bico fino deles, quase intocados. Pra onde ir?",
      "option_a": {
        "label": "Mergulhar nas migalhas junto com os pardais, porque eles já estão lá e parece ser bom",
        "effect": "loss",
        "note": "os pardais são rápidos e levam a melhor nas migalhas miúdas, sobra pouco e cada pombo come mal"
      },
      "option_b": {
        "label": "Focar nos pedaços grandes, que o bico fino do pardal não dá conta",
        "effect": "gain",
        "note": "comida garantida sem disputa, e o bando come bem"
      },
      "feedback": [
        "Pru-pru... quando duas espécies diferentes brigam pelo mesmo alimento, isso é Competição Interespecífica. Pardal é outra espécie, e migalha miúda é prato dele.",
        "Pru-pru... nosso bico é mais forte: dá pra quebrar pedaço grande que pardal nenhum consegue. Comida diferente, menos briga.",
        "Pru-pru... quem disputa migalha com pardal perde tempo. Vá de pedação!"
      ],
      "tier": 9
    },
    {
      "id": "q41",
      "category": "Competição interespecífica",
      "scenario": "Época de ninho chegando, e um buraco perfeito na parede de um prédio já está sendo espiado por um bando barulhento de maritacas, bem mais agressivas que qualquer pombo. Um companheiro mais afobado quer entrar logo na briga, “do jeito que sempre resolve com outros pombos”. Como agir?",
      "option_a": {
        "label": "Entrar na briga direto, do jeito que sempre resolve com outros pombos",
        "effect": "loss",
        "note": "maritacas bicam mais forte e em bando, o casal se machuca e perde a época toda de ninho"
      },
      "option_b": {
        "label": "Procurar outro buraco, numa parede sem maritaca por perto",
        "effect": "gain",
        "note": "o casal começa o ninho sem briga e sem risco"
      },
      "feedback": [
        "Pru-pru... maritaca é de outra espécie, e competição com outra espécie pode ser bem mais dura do que com outro pombo.",
        "Pru-pru... bando de maritaca briga em grupo e bica forte. Não é a mesma guerra de sempre.",
        "Pru-pru... contra inimigo diferente, estratégia diferente. Às vezes, o buraco ao lado resolve!"
      ],
      "tier": 9
    },
    {
      "id": "q42",
      "category": "Competição interespecífica",
      "scenario": "A lixeira atrás do restaurante enche de sobras todo fim de tarde. De noite, ela vira point de ratos, que disputam cada pedaço com dentada forte. De manhã cedo, antes dos ratos aparecerem, a mesma comida já está lá, livre. Quando ir?",
      "option_a": {
        "label": "De noite, quando a comida está mais fresca",
        "effect": "loss",
        "note": "os ratos dominam a lixeira à noite, e brigar com eles sai caro"
      },
      "option_b": {
        "label": "De manhãzinha, antes dos ratos aparecerem",
        "effect": "gain",
        "note": "a mesma comida, sem disputa nenhuma"
      },
      "feedback": [
        "Pru-pru... rato e pombo comem coisa parecida, e isso é Competição Interespecífica. Mas dá pra driblar brigando por horário, não só por espaço.",
        "Pru-pru... rato é bicho de noite. Pombo acorda cedo. Comendo em horários diferentes, ninguém disputa com ninguém.",
        "Pru-pru... cada um no seu turno! Madrugador come sem fila."
      ],
      "tier": 9
    },
    {
      "id": "q43",
      "category": "Competição interespecífica",
      "scenario": "No lago do parque, um bando de patos domina a beirada da água, onde os visitantes sempre jogam pão. Mais longe da água, perto dos bancos, as pessoas também soltam migalhas, só que em menor quantidade. Onde esperar o pão?",
      "option_a": {
        "label": "Perto da água, disputando espaço com os patos",
        "effect": "loss",
        "note": "os patos são maiores, empurram com o peito e levam a maior parte do pão"
      },
      "option_b": {
        "label": "Perto dos bancos, longe da água",
        "effect": "gain",
        "note": "menos pão, mas sem disputa com quem é maior e mais forte"
      },
      "feedback": [
        "Pru-pru... pato é outra espécie e, perto da água, é dono do pedaço. Competição Interespecífica às vezes já tem vencedor claro.",
        "Pru-pru... brigar com quem é maior custa caro. Melhor achar o canto onde a gente ganha fácil.",
        "Pru-pru... time grande no gramado principal, time pequeno na lateral. Os dois comem, cada um no seu campo!"
      ],
      "tier": 9
    },
    {
      "id": "q44",
      "category": "Competição interespecífica",
      "scenario": "Na mesma árvore, um sabiá belisca as frutinhas maduras lá em cima, enquanto no chão caem sementes que ele nem desce para pegar. Vale a pena disputar a fruta lá em cima ou ficar com a semente aqui embaixo?",
      "option_a": {
        "label": "Subir e disputar a fruta madura com o sabiá",
        "effect": "loss",
        "note": "o sabiá defende a fruta no próprio território dele, e a briga gasta mais energia do que rende"
      },
      "option_b": {
        "label": "Ficar no chão comendo as sementes que caem",
        "effect": "gain",
        "note": "comida garantida, sem disputa, enquanto o sabiá cuida da parte de cima"
      },
      "feedback": [
        "Pru-pru... sabiá come fruta lá em cima, a gente come semente aqui embaixo. Mesma árvore, comida diferente, sem Competição Interespecífica nenhuma.",
        "Pru-pru... quando cada espécie usa uma parte diferente do recurso, a briga quase desaparece.",
        "Pru-pru... a árvore é grande o bastante pros dois. Cada um no seu andar!"
      ],
      "tier": 9
    },
    {
      "id": "q45",
      "category": "Razão sexual",
      "scenario": "Nessa praça, quase todo pombo solteiro é macho, e sobram poucas fêmeas disponíveis. Toda fêmea que aparece puxa uma fila de pretendentes brigando. Um pombo teimoso jura que, insistindo bastante, uma hora alguma fêmea sobra pra ele ali mesmo.",
      "option_a": {
        "label": "Ficar brigando com os outros machos pela mesma fêmea, confiando que a persistência compensa",
        "effect": "loss",
        "note": "a disputa consome energia dos dois lados, machuca o casal que já estava se formando, e ele segue sem par"
      },
      "option_b": {
        "label": "Partir para outra praça, onde a proporção entre machos e fêmeas é mais equilibrada",
        "effect": "gain",
        "note": "encontra parceira sem disputa e forma par rapidamente"
      },
      "feedback": [
        "Pru-pru... Razão Sexual é a proporção entre machos e fêmeas no bando. Quando ela fica torta, com muito macho e pouca fêmea, a disputa aperta.",
        "Pru-pru... brigar por quem já tem par raramente dá certo, e ainda atrapalha o casal alheio. Melhor procurar onde a conta fecha.",
        "Pru-pru... onde tem fila, tem demora. Procure uma praça com menos fila!"
      ],
      "tier": 2
    },
    {
      "id": "q46",
      "category": "Razão sexual",
      "scenario": "Um pombo avista uma pomba jovem e bonita, pousada na mesma marquise de sempre. Animado, já quer ir direto construir o ninho do lado dela, sem nem se apresentar direito. Vale pular a conversa e ir direto ao ponto?",
      "option_a": {
        "label": "Ir direto construir o ninho do lado dela, sem fazer cortejo",
        "effect": "loss",
        "note": "ela não reconhece nenhum vínculo e sai voando assustada, sem formar par nenhum"
      },
      "option_b": {
        "label": "Fazer o ritual de cortejo primeiro: peito estufado, arrulho e rodopio diante dela",
        "effect": "gain",
        "note": "ela aceita o par, e os dois seguem juntos para o ninho"
      },
      "feedback": [
        "Pru-pru... antes de virar casal, a gente faz um ritual de Cortejo: peito estufado, arrulho e rodopio. É assim que formamos o par.",
        "Pru-pru... sem esse ritual, a fêmea não reconhece a intenção e foge. É o cortejo que transforma dois pombos soltos num casal de verdade.",
        "Pru-pru... dancinha não é frescura, é estratégia! Sem ritual, sem par."
      ],
      "tier": 2
    },
    {
      "id": "q47",
      "category": "Razão sexual",
      "scenario": "Um pombo já está pronto para botar ovos, mas o parceiro ainda está sem clima, trocando de pena, sem interesse em cortejo. Vale começar o ninho sozinho, torcendo pra ele se animar depois?",
      "option_a": {
        "label": "Começar o ninho sozinho, sem esperar o parceiro se interessar",
        "effect": "loss",
        "note": "sem os dois prontos ao mesmo tempo, a postura fica desencontrada, e a incubação não é dividida direito"
      },
      "option_b": {
        "label": "Esperar o cortejo sincronizar os dois antes de começar",
        "effect": "gain",
        "note": "os dois ficam prontos juntos, e a ninhada começa no tempo certo"
      },
      "feedback": [
        "Pru-pru... o cortejo não serve só para formar o par, ele também ajuda a sincronizar os dois pombos para a reprodução.",
        "Pru-pru... sem sincronia, um fica pronto antes do outro, e a parceria capenga.",
        "Pru-pru... casal bom é casal no mesmo ritmo!"
      ],
      "tier": 2
    },
    {
      "id": "q48",
      "category": "Razão sexual",
      "scenario": "Um pombo jovem repara que os beija-flores do jardim se viram sozinhos: a fêmea cuida do ninho inteira sozinha, sem ajuda do macho, e mesmo assim dá conta. Ele pensa em copiar o jeito e deixar a parceira cuidar de tudo dessa vez, pra ficar livre explorando a cidade.",
      "option_a": {
        "label": "Copiar o jeito do beija-flor e deixar a parceira cuidar da ninhada sozinha",
        "effect": "loss",
        "note": "diferente do beija-flor, a cria de pombo precisa de leite de papo dos dois pais, e sozinha ela não dá conta de tudo"
      },
      "option_b": {
        "label": "Manter o sistema dos pombos, revezando a incubação e o leite de papo os dois",
        "effect": "gain",
        "note": "a ninhada toda recebe cuidado suficiente e sobrevive"
      },
      "feedback": [
        "Pru-pru... cada espécie tem seu próprio Sistema de Acasalamento. Beija-flor se vira com só um pai, mas pombo não.",
        "Pru-pru... nossos filhotes dependem do leite de papo dos dois pais. Copiar outra espécie sem esse cuidado não funciona pra gente.",
        "Pru-pru... inspiração é bom, cópia nem sempre serve. Cada bicho no seu sistema!"
      ],
      "tier": 2
    }
  ]
};
