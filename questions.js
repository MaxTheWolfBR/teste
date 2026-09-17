// Banco de perguntas
const QUESTIONS = [
  // Gerais
  { id: 1, text: "Em uma escala de 1 a 10, quão importante é o sexo na sua vida atualmente?", category: "geral", options: null },
  { id: 2, text: "Você prefere sexo mais rápido e intenso ou mais lento e exploratório?", category: "geral", options: ["Rápido e intenso", "Lento e exploratório", "Depende do momento", "Ambos igualmente"] },
  { id: 3, text: "Com que frequência você se masturba?", category: "geral", options: ["Quase todo dia", "Algumas vezes por semana", "Raramente", "Prefiro não dizer"] },
  { id: 4, text: "Você se sente mais excitado(a) pela manhã, à tarde ou à noite?", category: "geral", options: ["Manhã", "Tarde", "Noite", "Qualquer horário"] },
  { id: 5, text: "Prefere luzes apagadas, penumbra ou luz acesa durante o sexo?", category: "ambiente", options: ["Apagadas", "Penumbra", "Acesa", "Depende"] },

  // Toque
  { id: 6, text: "Quais partes do seu corpo são mais sensíveis ao toque?", category: "toque", options: ["Pescoço", "Orelhas", "Mamilos", "Parte interna das coxas", "Outras"] },
  { id: 7, text: "Você gosta de ser beijado no pescoço com intensidade?", category: "toque", options: ["Sim, muito", "Às vezes", "Não gosto", "Ainda não experimentei"] },
  { id: 8, text: "Prefere estimulação manual, oral ou penetração como foco principal?", category: "toque", options: ["Manual", "Oral", "Penetração", "Mistura de tudo"] },
  { id: 9, text: "Você gosta de ter os cabelos puxados durante o sexo?", category: "toque", options: ["Sim, adoro", "Um pouco", "Não", "Nunca experimentei"] },
  { id: 10, text: "Gosta de beijos longos e molhados ou mais curtos e intensos?", category: "toque", options: ["Longos e molhados", "Curtos e intensos", "Ambos", "Depende"] },

  // Poder
  { id: 11, text: "Você se identifica mais como dominante, submisso(a) ou switch?", category: "poder", options: ["Dominante", "Submisso(a)", "Switch", "Ainda explorando"] },
  { id: 12, text: "A ideia de ser amarrado(a) te excita?", category: "poder", options: ["Sim, bastante", "Um pouco", "Não", "Curioso(a) para tentar"] },
  { id: 13, text: "Você gosta de dar ou receber ordens durante o sexo?", category: "poder", options: ["Dar", "Receber", "Ambos", "Nenhum"] },
  { id: 14, text: "A ideia de ser vendado(a) te atrai?", category: "poder", options: ["Sim", "Talvez", "Não", "Já experimentei"] },
  { id: 15, text: "Você gosta de controlar o ritmo ou prefere que o outro controle?", category: "poder", options: ["Controlar", "Ser controlado(a)", "Alternar", "Não tenho preferência"] },

  // Fetiches
  { id: 16, text: "Você tem interesse em light BDSM (chicote leve, algemas, venda)?", category: "fetiche", options: ["Sim", "Talvez", "Não", "Já pratiquei"] },
  { id: 17, text: "A ideia de roleplay (fantasias de papéis) te atrai?", category: "fetiche", options: ["Muito", "Um pouco", "Não", "Já fiz e gostei"] },
  { id: 18, text: "Você se excita com a ideia de ser observado(a) ou observar?", category: "fetiche", options: ["Ser observado(a)", "Observar", "Ambos", "Nenhum"] },
  { id: 19, text: "Gosta de sensações de temperatura (gelo, cera quente, etc.)?", category: "sensacao", options: ["Sim", "Curioso(a)", "Não", "Já experimentei"] },
  { id: 20, text: "Você tem interesse em brinquedos sexuais?", category: "fetiche", options: ["Sim, uso", "Quero experimentar", "Não interessa", "Já usei e gostei"] },
  { id: 21, text: "A ideia de sexo em locais semi-públicos te excita?", category: "fetiche", options: ["Sim", "Um pouco", "Não", "Já fiz"] },
  { id: 22, text: "Você gosta de dirty talk (conversa suja) durante o sexo?", category: "comunicacao", options: ["Sim, adoro", "Às vezes", "Não", "Quero aprender"] },
  { id: 23, text: "Prefere elogios suaves ou palavras mais pesadas/sujas?", category: "comunicacao", options: ["Elogios suaves", "Palavras pesadas", "Mistura", "Não gosto de falar"] },
  { id: 24, text: "A ideia de ser usado(a) ou usar alguém te excita?", category: "poder", options: ["Ser usado(a)", "Usar alguém", "Ambos", "Nenhum"] },
  { id: 25, text: "Você se interessa por spanking (tapas no bumbum)?", category: "fetiche", options: ["Sim, gosto", "Curioso(a)", "Não", "Já experimentei"] },

  // Prazer
  { id: 26, text: "Você consegue ter múltiplos orgasmos?", category: "prazer", options: ["Sim", "Às vezes", "Não", "Não sei"] },
  { id: 27, text: "Prefere orgasmo por penetração, clitóris/pênis ou combinação?", category: "prazer", options: ["Penetração", "Clitóris/Pênis", "Combinação", "Outro"] },
  { id: 28, text: "Você gosta de edging (chegar perto do orgasmo e parar)?", category: "prazer", options: ["Sim, adoro", "Às vezes", "Não", "Nunca tentei"] },
  { id: 29, text: "Prefere gozar junto com o parceiro ou em momentos separados?", category: "prazer", options: ["Junto", "Separado", "Tanto faz", "Depende"] },
  { id: 30, text: "Você se sente mais realizado(a) com orgasmos intensos e curtos ou longos e profundos?", category: "prazer", options: ["Intensos e curtos", "Longos e profundos", "Ambos", "Não sei"] },

  // Exploração
  { id: 31, text: "Você tem alguma fantasia recorrente que ainda não realizou?", category: "fantasia", options: null },
  { id: 32, text: "Existe algum limite claro que você não quer ultrapassar?", category: "limites", options: null },
  { id: 33, text: "Você gosta de aftercare (carinho depois do sexo intenso)?", category: "aftercare", options: ["Sim, essencial", "Às vezes", "Não preciso", "Não conheço"] },
  { id: 34, text: "A ideia de ser filmado(a) (só para vocês dois) te atrai?", category: "fetiche", options: ["Sim", "Talvez", "Não", "Já fiz"] },
  { id: 35, text: "Você se interessa por degradação leve ou prefere apenas admiração?", category: "poder", options: ["Degradação leve", "Admiração", "Ambos", "Nenhum"] },
  { id: 36, text: "Gosta de ter o corpo marcado (chupões, tapas, etc.)?", category: "sensacao", options: ["Sim", "Um pouco", "Não", "Depende da intensidade"] },
  { id: 37, text: "Você prefere sexo mais emocional e conectado ou mais carnal e bruto?", category: "geral", options: ["Emocional e conectado", "Carnal e bruto", "Ambos", "Depende do dia"] },
  { id: 38, text: "A ideia de ser 'obrigado(a)' de forma consensual te excita?", category: "poder", options: ["Sim", "Talvez", "Não", "Já experimentei"] },
  { id: 39, text: "Você gosta de explorar diferentes posições ou prefere as favoritas?", category: "posicoes", options: ["Explorar novas", "Favoritas", "Mistura", "Não tenho preferência"] },
  { id: 40, text: "Existe algum cheiro, sabor ou textura que te excite especialmente?", category: "sensorial", options: null }
];
