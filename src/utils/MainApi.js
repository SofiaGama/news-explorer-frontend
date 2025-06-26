const simulateApiResponse = (data, delay = 500) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const register = ({ email, password, name }) => {
  console.log("SIMULANDO REGISTRO:", { email, password, name });
  return simulateApiResponse({
    data: {
      _id: "mockUserId" + Date.now(),
      email: email,
      name: name,
    },
  });
};

export const authorize = ({ email, password }) => {
  console.log("SIMULANDO LOGIN:", { email, password });
  if (email === "test@example.com" && password === "password123") {
    return simulateApiResponse({
      token: "mock-jwt-token-for-test-user-12345",
    });
  } else {
    return simulateApiResponse(
      { message: "Email ou senha inválidos." },
      500
    ).then((data) => Promise.reject(data));
  }
};

export const checkToken = (token) => {
  console.log("SIMULANDO VERIFICAÇÃO DE TOKEN:", token);
  if (token === "mock-jwt-token-for-test-user-12345") {
    return simulateApiResponse({
      data: {
        _id: "mockUserId123",
        email: "test@example.com",
        name: "Usuário Teste",
      },
    });
  } else {
    return simulateApiResponse(
      { message: "Token inválido ou expirado." },
      500
    ).then((data) => Promise.reject(data));
  }
};

export const getSavedArticles = (token) => {
  console.log("SIMULANDO OBTER ARTIGOS SALVOS com token:", token);

  if (token !== "mock-jwt-token-for-test-user-12345") {
    return simulateApiResponse({ message: "Não autorizado." }, 401).then(
      (data) => Promise.reject(data)
    );
  }

  const mockSavedArticles = [
    {
      _id: "savedArticle1",
      keyword: "Espaço",
      title: "Exploração Espacial: Novas Descobertas e Desafios",
      text: "Cientistas anunciam avanços significativos na pesquisa de exoplanetas, abrindo novas fronteiras para a exploração humana.",
      date: "2 de Agosto, 2024",
      source: "NASA Insights",
      link: "http://example.com/nasa-space-exploration",
      image:
        "https://images.unsplash.com/photo-1576081498777-742a0b411d82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      owner: "mockUserId123",
    },
    {
      _id: "savedArticle2",
      keyword: "Tecnologia",
      title: "O Futuro da Inteligência Artificial em 2025",
      text: "Novos desenvolvimentos em IA prometem revolucionar indústrias e o dia a dia, com foco em personalização e eficiência.",
      date: "5 de Setembro, 2024",
      source: "Tech Journal Daily",
      link: "http://example.com/tech-ai-future",
      image:
        "https://images.unsplash.com/photo-1507146153580-602947a1668f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      owner: "mockUserId123",
    },
    {
      _id: "savedArticle3",
      keyword: "Meio Ambiente",
      title: "Desafios Climáticos: Inovações Verdes e Sustentabilidade",
      text: "Avanços em energias renováveis e práticas sustentáveis são essenciais para combater as mudanças climáticas e proteger o planeta.",
      date: "10 de Outubro, 2024",
      source: "Green Earth News",
      link: "http://example.com/green-innovations",
      image:
        "https://images.unsplash.com/photo-1473187285237-456641e2613e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      owner: "mockUserId123",
    },
  ];
  return simulateApiResponse({ data: mockSavedArticles });
};

export const saveArticle = (token, articleData) => {
  console.log("SIMULANDO SALVAR ARTIGO:", articleData);
  if (token !== "mock-jwt-token-for-test-user-12345") {
    return simulateApiResponse({ message: "Não autorizado." }, 401).then(
      (data) => Promise.reject(data)
    );
  }

  return simulateApiResponse({
    data: {
      _id: "savedArticle" + Date.now(),
      ...articleData,
      owner: "mockUserId123",
    },
  });
};

export const deleteArticle = (token, articleId) => {
  console.log("SIMULANDO DELETAR ARTIGO com ID:", articleId);
  if (token !== "mock-jwt-token-for-test-user-12345") {
    return simulateApiResponse({ message: "Não autorizado." }, 401).then(
      (data) => Promise.reject(data)
    );
  }

  return simulateApiResponse({ message: "Artigo removido" });
};
