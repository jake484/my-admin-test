const document: AuthRoute.Route = {
  name: 'document',
  path: '/document',
  component: 'basic',
  children: [
    {
      name: 'document_project',
      path: '/document/project',
      component: 'self',
      meta: {
        title: '项目文档',
        requiresAuth: true,
        localIcon: 'log'
      }
    },
    {
      name: 'document_ai4edocs',
      path: '/document/ai4edocs',
      component: 'self',
      meta: {
        title: 'Ai4E基础文档',
        requiresAuth: true,
        localIcon: 'ai4edocs'
      }
    },
    {
      name: 'document_ai4emetapse',
      path: '/document/ai4emetapse',
      component: 'self',
      meta: {
        title: '解析器文档',
        requiresAuth: true,
        localIcon: 'ai4emetapse'
      }
    },
    {
      name: 'document_ai4eserver',
      path: '/document/ai4eserver',
      component: 'self',
      meta: {
        title: '后端框架文档',
        requiresAuth: true,
        localIcon: 'ai4eserver'
      }
    },
    {
      name: 'document_ai4ecomponentlib',
      path: '/document/ai4ecomponentlib',
      component: 'self',
      meta: {
        title: '组件库文档',
        requiresAuth: true,
        localIcon: 'ai4ecomponentlib'
      }
    },
    {
      name: 'document_vue',
      path: '/document/vue',
      component: 'self',
      meta: {
        title: 'vue文档',
        requiresAuth: true,
        icon: 'logos:vue'
      }
    },
    {
      name: 'document_naive',
      path: '/document/naive',
      component: 'self',
      meta: {
        title: 'naive文档',
        requiresAuth: true,
        icon: 'logos:naiveui'
      }
    }
  ],
  meta: {
    title: '文档',
    icon: 'mdi:file-document-multiple-outline',
    order: 2
  }
};

export default document;
