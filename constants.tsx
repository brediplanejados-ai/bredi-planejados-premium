
import { Project, Testimonial, ProcessStep } from './types';

export const CONFIG = {
  brand: {
    name: 'Bredi',
    suffix: 'Planejados',
    full: 'Bredi Planejados - Móveis Sob Medida',
    tagline: 'Móveis sob medida para o seu ambiente',
  },
  contact: {
    whatsapp: '5511000000000',
    phoneDisplay: '(11) 0000-0000',
    email: 'contato@brediplanejados.com.br',
    address: 'São Paulo - SP',
  }
};

export const COLORS = {
  primary: '#C5A059',
  dark: '#000000',
  card: '#111111',
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cozinha Gourmet Itapeva',
    subtitle: 'Fidelidade 100% ao projeto 3D',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADlA9Qyhdms3eZY6POHm-jUoR4u_hBaoZTu7mQNhfsDpCVSqKZhUc51c0xYa-f4tFc7otPSNxaHm0A4J4VjqQPLYfMv3rCzxHWsPg_hvdLfsUiI8uxePOrFRG8b0Cmv7d0ykXOBmXI_LCjirXKFjwuhVaQJq3NNELbsJ_d8DuWSKb2UbBw5mH3L5-eTvY_0LAxT5NjzUVGF-Ca9WM1og-AVQaSDc4fMxWu7dpZGtwcdVTLUBXX0cHNauFACJw0NT1g7uCDcG4UUpsZ',
    tag: 'REALIZADO'
  },
  {
    id: '2',
    title: 'Suíte Master Ville',
    subtitle: 'Conforto e sofisticação',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5j_1UG4GYun9tiw4-2PqJsVV6F5zpuxJaEyksxzFnqDNKQSbgq28dQn6rpH0zwFkBD6l-JJgNN4CtLiDoYLhfhgz2xFiTI57r8EGm0Z3t26UGz31LFJxjrQFEcRFMmNez7DRBobJS1XW2RdSTJClWYDx80dxVJ2g7k3zOKE7pb_1jL1dsbYUPOSMO_xvbctr32pt9rFBAO5NIBzWzhu8xssJaA0wFJEgwndEKKwiid7uzErkBp4xcj0ajxa4J6WlhwkU7nXUKfHOz',
    tag: 'REALIZADO'
  },
  {
    id: '3',
    title: 'Home Office Premium',
    subtitle: 'Design funcional',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfG_LDJLobtzoz67d5CFG2FE1ibsEI56iLRTeX4JdYLUxZKQUINL0bZL_ANrKPjvFgQR6tXmYKsGu2FQ4MQ-DDRsF_4AqpLSrgmopJCaXIg_hLQ_k3Qs0TFqkBv7RiVmBpIcyI1rlQH2SGYUokvLGMkfWC_NX6nZBse7MTTRr8m_lL-0v7aUh5FiTgd_Xu0Vn1gK4A5cYZaH4iM793rkCOCWg00xehYfswVd-4IwqkFIwRWl7jYryzBFo9ok2m2KBQX5lBhSjDY7YX',
    tag: 'REALIZADO'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    role: 'Proprietária em Itapeva',
    text: '"A Bredi superou todas as nossas expectativas. O projeto 3D ficou idêntico ao resultado final. A atenção aos detalhes é impressionante."',
    avatar: 'https://picsum.photos/seed/mariana/200',
    rating: 5
  },
  {
    id: '2',
    name: 'Ricardo Oliveira',
    role: 'Empresário',
    text: '"O profissionalismo da equipe na montagem foi o diferencial. Tudo limpo e organizado. Recomendo para quem busca alto padrão."',
    avatar: 'https://picsum.photos/seed/ricardo/200',
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: 1, title: 'Orçamento', description: 'Análise técnica inicial e levantamento de necessidades.', icon: 'calculate' },
  { id: 2, title: 'Projeto 3D', description: 'Visualização realista do seu sonho antes da execução.', icon: 'view_in_ar' },
  { id: 3, title: 'Ajustes', description: 'Refinamento de detalhes para total satisfação.', icon: 'edit_note' },
  { id: 4, title: 'Produção', description: 'Fabricação própria com tecnologia de ponta.', icon: 'precision_manufacturing' },
  { id: 5, title: 'Instalação', description: 'Montagem especializada e entrega do ambiente pronto.', icon: 'handyman' }
];

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5aQI8bjJvtJq2cBq12hsLZ2Qsq4eCtsRPtzwPfsLm4NkeKt7zvDmZMgWORPM_vrp7IphxSO05P35tHObT7roia1hJVCOd3G1CZIW_r-1Tk13NU4lSbz0TON2lwEwLDFhds3t09QMSt-i7tUijmK1kciE5oA-qVXE-OMe-MTzS6Vpn-8Cs5RVscoMe4IcJZbVhzpHhb8KgalNMGlBgTkdJdTiA5kHMMwbip1seJW9FFIIixvVq_VMHbns3gkWnUFpoq24cvbbR3OZr';

export const EXCLUSIVITY_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjVgPyVJLjcwKKwblkYWaZQMvVkhav2y-XxJRJ5-oN45BXjiMJz7tck85BEsYopf7RoksP30YjhK26VbOstasNaUabBEVIxNSlk4mwNOB9d1-_9xcoMS9UOQHetZ3mNRJpX8rmoF4XSCh-7mumV0JLdKJf9FBehwQR6FWgsdXSK7noAxuo0SOmxShWya8a0wXY_jZF4Hmbh2gWw_c4suHiTpZIe_meJOOFjepC0l6RJ0ZvDtFz1LgnY9SKMJbjztb8SWwlTPQbhuFy';
export const FOUNDER_IMAGE = '/founder-perfil.png';

export const SOLUTIONS = [
  { title: 'Cozinhas', subtitle: 'Funcionalidade Gourmet', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrNHO9sFQWZHDFMPY3KDb5Bmygw54bMG1tgiYPP_ehrZC-ytc75uwPTY8YxMDERbkycm6_KMIVRXZa_9Mvnf48LEq7f6PR8rRvVSMzOzDBIepkVQt7i4HXd011BQZogLCqfc0jm0aQ7CTTXK4k199qSK9yE8Cff50CTJg_scFzjCsfAGIZ7dAVPhWBxfjhVKaU7oxq1rBdiMG5D65ODghF3_MSsVjVS5ZcqTPUVXKvFotgvOP6fqA-DMu6nPzivMof4ZgMVBlG3aiQ' },
  { title: 'Dormitórios & Closets', subtitle: 'Conforto & Organização', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu1JBdFGcncNZeHMF4TXNdUpTEF1XUh3015hMlyLstYhVxr-E8AS96igdOGe1BCg6M3LozkuILUmnaH6QK3H7va7NQ9crcvJ9RNxUSIo6hnzJ7Cj_QMIPnLgwvZ3s9-gXLwD5TQUKpV5HNLA6GbgAc4rvcnHjsRidkB1yu74OpkRMHctLOjMnNYL3hmj_LA0z1TYVVmaAbcfkPScb6EY2W8UOZcSlt8cfZgFc4PvPUQ4kA2c_PjUP27s3iQuN3uZj75-ev3t5EUcyR' },
  { title: 'Home Offices', subtitle: 'Produtividade com Estilo', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDecqbhog3RDV8xoMWEvEN7QqoKdJz0oyigMeArwAw-mezzoN7aZOojInRrjFQvbWVcwPf0tEMPDz7IIELDo_W-jwaznkhs-K_ZK5VH060i1ilT241FllVfqBXZW2HXEkntTsJ-M3EAN3Ug4fF6VHlteF11J4u3u-VslYL6pWOwugu1Tdq0RASSNX7Sh82LCS0fnb5qO0eRMLPMhyWUS6f8mSIPfBWXPSbseU0bHON347PNhEh-9ex3civRU3HtEurUoKR56_trcC2o' }
];
