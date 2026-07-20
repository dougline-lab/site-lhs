import { SiteData } from "./types";
// @ts-ignore
import highwayImg from "./assets/images/highway_under_construction_1784563314455.jpg";

export const defaultSiteData: SiteData = {
  company: {
    name: "LH Silva",
    logoText: "LH SILVA",
    phone: "5515998154321",
    whatsappMsgDefault: "Olá! Gostaria de fazer um orçamento de locação de máquinas ou saber mais sobre os serviços de supressão vegetal.",
    email: "contato@lhsilva.com.br",
    address: "Av. Industrial, 1200 - Distrito Industrial",
    cityState: "Sorocaba - SP",
    workingHours: "Segunda a Sexta: 07h às 17h"
  },
  hero: {
    title: "Força e Precisão para Grandes Projetos de Infraestrutura",
    subtitle: "Especialistas em locação de máquinas pesadas e execução técnica de supressão vegetal. Soluções eficientes com alta segurança e responsabilidade operacional.",
    ctaText: "Solicitar Orçamento",
    secondaryCtaText: "Ver Nossos Serviços",
    bgImageUrl: highwayImg
  },
  about: {
    title: "Compromisso com o seu Terreno e Prazo",
    subtitle: "Conheça a LH Silva",
    text1: "Natural da cidade de João Monlevade/MG, a empresa estende seu atendimento técnico de alta qualidade a diversas cidades pelo Brasil. Fundada com o objetivo de oferecer excelência em logística de maquinário pesado, terraplanagem e limpeza, a LH Silva consolidou-se como um parceiro estratégico para construtoras, produtores agrícolas e grandes projetos de infraestrutura, acumulando sólida experiência no atendimento de prefeituras e concessionárias de rodovias.",
    text2: "Nossa frota moderna é submetida a manutenções preventivas rigorosas, garantindo produtividade máxima no canteiro de obras. Contamos com operadores certificados, prontos para lidar com os desafios geográficos e técnicos mais exigentes do mercado com máxima segurança e conformidade operacional.",
    licenseTitle: "Aviso Importante sobre Licenciamento Ambiental",
    licenseText: "A LH Silva realiza a execução técnica qualificada de supressão vegetal e limpeza de terrenos. No entanto, não realizamos os trâmites legais para obtenção de licenças ambientais. A obtenção e regularização das devidas licenças e autorizações junto aos órgãos competentes são de responsabilidade exclusiva do contratante antes do início das atividades de campo.",
    values: [
      {
        title: "Segurança Absoluta",
        description: "Zero incidentes. Operações com EPIs completos, maquinários revisados e profissionais altamente treinados.",
        iconName: "Shield"
      },
      {
        title: "Eficiência e Prazo",
        description: "Cronogramas respeitados à risca. Maquinário disponível no momento exato da sua necessidade operacional.",
        iconName: "Clock"
      },
      {
        title: "Sustentabilidade Técnica",
        description: "Atuação cirúrgica para minimizar impactos ecológicos, realizando o manejo correto de resíduos e solo.",
        iconName: "Leaf"
      }
    ]
  },
  services: {
    title: "Nossas Soluções Especializadas",
    subtitle: "O Que Fazemos",
    text: "Disponibilizamos frotas pesadas de alto desempenho e executamos serviços de supressão sob rigor técnico de engenharia.",
    items: [
      {
        title: "Supressão Vegetal de Alta Precisão",
        description: "Remoção técnica de cobertura vegetal para liberação de áreas industriais, agrícolas ou de infraestrutura urbana.",
        iconName: "Trees",
        features: [
          "Derrubada e destocamento de árvores",
          "Limpeza fina e preparação de solo",
          "Trituração e destinação ecológica de resíduos",
          "Trabalho em terrenos planos ou acidentados"
        ]
      },
      {
        title: "Locação de Máquinas Pesadas",
        description: "Disponibilidade de frota de ponta para curtas, médias ou longas durações, com ou sem operador qualificado.",
        iconName: "Truck",
        features: [
          "Escavadeiras hidráulicas de última geração",
          "Tratores de esteira com alto torque",
          "Retroescavadeiras e motoniveladoras",
          "Manutenção no local inclusa nos contratos"
        ]
      },
      {
        title: "Limpeza de Terrenos e Destocamento",
        description: "Preparação de solos brutos, eliminando cepos, raízes profundas e entulhos de forma rápida e eficiente.",
        iconName: "Wrench",
        features: [
          "Remoção de raízes profundas",
          "Nivelamento inicial de terrenos",
          "Abertura de caminhos e acessos",
          "Descarte correto de entulhos orgânicos"
        ]
      }
    ]
  },
  machines: [
    {
      id: "escavadeira",
      name: "Escavadeira Hidráulica 20 Toneladas",
      category: "pesada",
      description: "Ideal para escavações profundas, destocamento de grandes árvores e movimentação ágil de terra.",
      specs: ["Peso operacional: 21.200 kg", "Potência: 150 HP", "Capacidade da caçamba: 1.2 m³"],
      imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "trator-esteira",
      name: "Trator de Esteira D6",
      category: "pesada",
      description: "Excelente para espalhamento de material, nivelamento pesado e empurre de materiais em supressão vegetal.",
      specs: ["Peso operacional: 18.500 kg", "Potência: 170 HP", "Largura da lâmina: 3.4 m"],
      imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "retroescavadeira",
      name: "Retroescavadeira 4x4",
      category: "suporte",
      description: "Máquina versátil indispensável para suporte à limpeza, abertura de valas e carregamento ágil.",
      specs: ["Peso operacional: 7.800 kg", "Potência: 90 HP", "Tração: 4x4 integral"],
      imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "triturador-florestal",
      name: "Triturador / Mulcher Florestal",
      category: "acessorios",
      description: "Acoplável em escavadeiras para trituração instantânea de vegetação, galhos e arbustos.",
      specs: ["Diâmetro de corte: até 25 cm", "Largura de trabalho: 1.5 m", "Tritura galhos diretamente no solo"],
      imageUrl: "https://images.unsplash.com/photo-1588714014411-847c9e53d12a?auto=format&fit=crop&q=80&w=800"
    }
  ],
  portfolio: [
    {
      id: "p1",
      title: "Supressão em Área Industrial",
      category: "supressao",
      description: "Limpeza completa de 15 hectares para futura instalação de complexo logístico.",
      imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800",
      localPath: "imagens/portfolio_industrial.jpg"
    },
    {
      id: "p2",
      title: "Locação de Frota para Duplicação",
      category: "locacao",
      description: "Disponibilização de escavadeiras e tratores de esteira para movimentação de terra.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      localPath: "imagens/portfolio_rodovia.jpg"
    },
    {
      id: "p3",
      title: "Limpeza de Terreno para Loteamento",
      category: "limpeza",
      description: "Destocamento de raízes profundas e nivelamento para condomínio horizontal.",
      imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800",
      localPath: "imagens/portfolio_loteamento.jpg"
    }
  ],
  testimonials: [
    {
      id: "t1",
      name: "Ricardo Mendonça",
      role: "Engenheiro de Infraestrutura",
      company: "EngeTerra S.A.",
      text: "A locação do Trator D6 foi fundamental para mantermos o cronograma da obra. A máquina chegou revisada e o operador disponibilizado era extremamente experiente.",
      rating: 5
    },
    {
      id: "t2",
      name: "Juliana Santos",
      role: "Diretora de Operações",
      company: "Loteamentos Sol Nascente",
      text: "Excelente serviço de supressão técnica. Eles respeitaram as marcações topográficas à risca e mantiveram o terreno limpo e destocado no prazo acordado.",
      rating: 5
    },
    {
      id: "t3",
      name: "Adilson Ferreira",
      role: "Gerente de Logística Agro",
      company: "AgroPecuária Vale Verde",
      text: "O atendimento deles é ágil. Alugamos duas escavadeiras de 20 toneladas. Suporte de manutenção preventiva excelente, sem nenhuma hora de máquina parada.",
      rating: 5
    }
  ]
};
