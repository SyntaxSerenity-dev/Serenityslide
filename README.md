# 🎨 SerenitySlide v1.0.0

> **Biblioteca JavaScript avançada para criação de slideshows profissionais**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/SyntaxSerenity-dev/serenity-slide)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Developed by](https://img.shields.io/badge/developed%20by-Syntax%20Serenity-purple.svg)](https://www.syntaxserenity.co.ao)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Uso Básico](#-uso-básico)
- [Configurações](#-configurações)
- [Efeitos de Transição](#-efeitos-de-transição)
- [Navegação](#-navegação)
- [Responsividade](#-responsividade)
- [Callbacks](#-callbacks)
- [Métodos Públicos](#-métodos-públicos)
- [Exemplos Avançados](#-exemplos-avançados)
- [Suporte](#-suporte)

---

## 🎯 Visão Geral

**SerenitySlide** é uma biblioteca JavaScript moderna e flexível para criação de slideshows profissionais com múltiplos efeitos de transição, navegação completa e suporte responsivo avançado.

Desenvolvida pela **Syntax Serenity**, combina performance, elegância visual e facilidade de uso para criar experiências interativas de alto nível.

---

## ✨ Características

### Core Features
- 🎬 **5 Efeitos de Transição**: slide, fade, scale, rotate, cube
- 🎨 **Efeitos Individuais por Slide**: Configure efeitos diferentes para cada slide
- ⏱️ **Autoplay Inteligente**: Tempos configuráveis individualmente por slide
- 🖱️ **Navegação Completa**: Setas, dots, teclado e touch/swipe
- 📱 **100% Responsivo**: Breakpoints customizáveis (maxMedia, minMedia, respMedia)
- 🎭 **Glassmorphism Design**: Controles modernos com efeito glass

### Funcionalidades Avançadas
- ⏸️ **Pause on Hover**: Para autoplay automaticamente ao passar mouse
- 🔢 **Formatação de Números**: Abreviações automáticas (K, M, B, T)
- 🔄 **Sistema de Callbacks**: onInit, onSlideChange, before/afterSlideChange
- 🚫 **Proteção de Transições**: Previne múltiplas transições simultâneas
- 📦 **Múltiplos Containers**: Suporte para vários slideshows na mesma página
- 🎯 **API Pública Completa**: Controle programático via métodos públicos

---

## 📦 Requisitos

### Navegadores Suportados
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Dependências
- **Font Awesome** (para ícones de setas)
- **ES6+** (Classes, Arrow Functions, Template Literals)
- **Touch Events API** (para suporte mobile)

### Características CSS Necessárias
- CSS3 Transforms e Transitions
- CSS3 Backdrop Filter (para glassmorphism)

---

## 🚀 Instalação

### 1. Baixar Arquivos

```
serenity-slide/
├── SerenitySlide.js
└── SerenitySlide.css
```

### 2. Incluir no HTML

```html
<!-- CSS -->
<link rel="stylesheet" href="path/to/SerenitySlide.css">

<!-- Font Awesome (para ícones) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- JavaScript -->
<script src="path/to/SerenitySlide.js"></script>
```

### 3. Estrutura HTML

```html
<div class="meu-slideshow">
    <div class="serenity-slide-item">
        <!-- Conteúdo do Slide 1 -->
        <img src="imagem1.jpg" alt="Slide 1">
    </div>
    <div class="serenity-slide-item">
        <!-- Conteúdo do Slide 2 -->
        <img src="imagem2.jpg" alt="Slide 2">
    </div>
    <div class="serenity-slide-item">
        <!-- Conteúdo do Slide 3 -->
        <img src="imagem3.jpg" alt="Slide 3">
    </div>
</div>
```

---

## 🎮 Uso Básico

### Inicialização Simples

```javascript
// Por classe
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow'
});

// Por ID
const slideshow = new SerenitySlide({
    contentId: 'slideshow-principal'
});

// Por elemento DOM
const element = document.querySelector('.meu-slideshow');
const slideshow = new SerenitySlide({
    content: element
});
```

### Configuração Básica

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    effect: 'fade',           // Efeito de transição
    timeViews: 5000,          // 5 segundos por slide
    autoPlay: true,           // Autoplay ativo
    pauseOnHover: true,       // Pausa ao hover
    loop: true                // Loop infinito
});
```

---

## ⚙️ Configurações

### Opções Disponíveis

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `contentClass` | String | null | Seletor de classe CSS |
| `contentId` | String | null | ID do elemento |
| `content` | HTMLElement | null | Elemento DOM direto |
| `slideCount` | Number | 0 | Número de slides (auto-detectado) |
| `slideViews` | Number | 1 | Slides visíveis simultaneamente |
| `effect` | String\|Array | 'slide' | Efeito de transição |
| `timeViews` | Number\|Array | 5000 | Tempo de exibição (ms) |
| `autoPlay` | Boolean | true | Ativar autoplay |
| `pauseOnHover` | Boolean | true | Pausar ao hover |
| `loop` | Boolean | true | Loop infinito |
| `slideClass` | String | 'serenity-slide-item' | Classe dos slides |
| `activeClass` | String | 'serenity-active' | Classe do slide ativo |
| `navigation` | Object | {...} | Configurações de navegação |
| `responsive` | Array | [] | Breakpoints responsivos |
| `numberFormat` | Object | {...} | Formatação de números |
| `onInit` | Function | null | Callback após inicialização |
| `onSlideChange` | Function | null | Callback ao trocar slide |
| `beforeSlideChange` | Function | null | Callback antes da troca |
| `afterSlideChange` | Function | null | Callback após a troca |

### Objeto Navigation

```javascript
navigation: {
    arrows: true,      // Mostrar setas prev/next
    dots: true,        // Mostrar dots
    keyboard: true,    // Navegação por teclado
    touch: true        // Suporte touch/swipe
}
```

### Objeto NumberFormat

```javascript
numberFormat: {
    abbreviate: false,           // Ativar abreviações
    thousandsSeparator: ' ',     // Separador de milhares
    decimalSeparator: ',',       // Separador decimal
    abbreviations: {
        thousand: 'K',           // 1000 = 1K
        million: 'M',            // 1000000 = 1M
        billion: 'B',            // 1000000000 = 1B
        trillion: 'T'            // 1000000000000 = 1T
    }
}
```

---

## 🎬 Efeitos de Transição

### Efeitos Disponíveis

1. **slide** - Deslizamento horizontal (padrão)
2. **fade** - Fade in/out simples
3. **scale** - Zoom in/out
4. **rotate** - Rotação 3D (eixo Y)
5. **cube** - Efeito cubo 3D

### Efeito Único para Todos

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    effect: 'fade'  // Todos os slides usam fade
});
```

### Efeitos Individuais por Slide

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    effect: ['slide', 'fade', 'scale', 'rotate', 'cube']
    // Slide 1: slide
    // Slide 2: fade
    // Slide 3: scale
    // Slide 4: rotate
    // Slide 5: cube
});
```

---

## 🧭 Navegação

### Navegação por Setas

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    navigation: {
        arrows: true  // Ativa setas prev/next
    }
});
```

### Navegação por Dots

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    navigation: {
        dots: true  // Ativa indicadores dots
    }
});
```

### Navegação por Teclado

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    navigation: {
        keyboard: true  // Arrow Left/Right
    }
});
```

### Navegação Touch/Swipe

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    navigation: {
        touch: true  // Ativa gestos swipe
    }
});
```

---

## 📱 Responsividade

### Breakpoints Responsivos

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    effect: 'slide',
    timeViews: 5000,
    
    responsive: [
        // Desktop large (>= 1200px)
        {
            minMedia: 1200,
            effect: 'cube',
            timeViews: 6000,
            navigation: {
                arrows: true,
                dots: true
            }
        },
        
        // Tablet (768px - 1024px)
        {
            respMedia: [768, 1024],
            effect: 'fade',
            timeViews: 4000,
            navigation: {
                arrows: true,
                dots: true
            }
        },
        
        // Mobile (<= 768px)
        {
            maxMedia: 768,
            effect: 'slide',
            timeViews: 3000,
            navigation: {
                arrows: false,  // Oculta setas em mobile
                dots: true,
                touch: true     // Apenas touch
            }
        }
    ]
});
```

### Tipos de Breakpoints

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `maxMedia` | Largura máxima | `{ maxMedia: 768 }` → width <= 768px |
| `minMedia` | Largura mínima | `{ minMedia: 1200 }` → width >= 1200px |
| `respMedia` | Range de largura | `{ respMedia: [768, 1024] }` → 768px <= width <= 1024px |

---

## 🔔 Callbacks

### Callback: onInit

Executado após inicialização completa.

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    
    onInit: function(instance) {
        console.log('Slideshow inicializado!');
        console.log('Containers:', instance.containers.length);
        console.log('Configuração:', instance.config);
    }
});
```

### Callback: onSlideChange

Executado ao trocar de slide (após transição).

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    
    onSlideChange: function(slideIndex, slideElement) {
        console.log('Slide ativo:', slideIndex);
        console.log('Elemento:', slideElement);
        
        // Exemplo: Atualizar contador
        document.querySelector('.contador').textContent = 
            `Slide ${slideIndex + 1} de ${this.config.slideCount}`;
    }
});
```

### Callback: beforeSlideChange

Executado antes de iniciar transição.

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    
    beforeSlideChange: function(currentIndex, nextIndex) {
        console.log(`Transição: ${currentIndex} → ${nextIndex}`);
        
        // Exemplo: Pausar vídeo do slide atual
        const currentSlide = this.containers[0]
            .querySelector(`[data-slide-index="${currentIndex}"]`);
        const video = currentSlide.querySelector('video');
        if (video) video.pause();
    }
});
```

### Callback: afterSlideChange

Executado após conclusão da transição.

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    
    afterSlideChange: function(slideIndex) {
        console.log('Transição concluída para:', slideIndex);
        
        // Exemplo: Reproduzir vídeo do novo slide
        const newSlide = this.containers[0]
            .querySelector(`[data-slide-index="${slideIndex}"]`);
        const video = newSlide.querySelector('video');
        if (video) video.play();
    }
});
```

---

## 🛠️ Métodos Públicos

### nextSlide(containerIndex)

Avança para o próximo slide.

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow'
});

// Avançar manualmente
document.querySelector('.meu-botao-next')
    .addEventListener('click', () => {
        slideshow.nextSlide(0);  // Container índice 0
    });
```

### prevSlide(containerIndex)

Retrocede para o slide anterior.

```javascript
document.querySelector('.meu-botao-prev')
    .addEventListener('click', () => {
        slideshow.prevSlide(0);
    });
```

### goToSlide(containerIndex, slideIndex)

Navega para slide específico.

```javascript
// Ir para o slide 3 (índice 2)
slideshow.goToSlide(0, 2);
```

### startAutoPlay(containerIndex)

Inicia autoplay manualmente.

```javascript
slideshow.startAutoPlay(0);
```

### stopAutoPlay(containerIndex)

Para autoplay manualmente.

```javascript
slideshow.stopAutoPlay(0);
```

### destroy()

Destrói a instância do slideshow.

```javascript
slideshow.destroy();
// Remove listeners, para autoplay, limpa elementos
```

### updateConfig(newConfig)

Atualiza configuração sem recriar instância.

```javascript
slideshow.updateConfig({
    effect: 'fade',
    timeViews: 3000,
    autoPlay: false
});
```

---

## 🎓 Exemplos Avançados

### Exemplo 1: Tempos Diferentes por Slide

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    effect: 'slide',
    
    // Cada slide tem seu próprio tempo
    timeViews: [
        3000,  // Slide 1: 3 segundos
        5000,  // Slide 2: 5 segundos
        4000,  // Slide 3: 4 segundos
        6000   // Slide 4: 6 segundos
    ]
});
```

### Exemplo 2: Formatação de Números

```html
<div class="serenity-slide-item">
    <h2>Estatísticas</h2>
    <p>Usuários: <span data-number="1500000">1500000</span></p>
    <p>Downloads: <span data-number="25000000">25000000</span></p>
</div>
```

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.meu-slideshow',
    
    numberFormat: {
        abbreviate: true,
        abbreviations: {
            thousand: 'mil',
            million: 'mi',
            billion: 'bi',
            trillion: 'tri'
        }
    }
});

// Resultado:
// Usuários: 1.5mi
// Downloads: 25.0mi
```

### Exemplo 3: Slideshow de Produtos com Callbacks

```javascript
const slideshow = new SerenitySlide({
    contentClass: '.produtos-slideshow',
    effect: 'scale',
    timeViews: 5000,
    
    onSlideChange: function(index, slide) {
        // Atualizar informações do produto
        const productId = slide.dataset.productId;
        updateProductInfo(productId);
        
        // Tracking analytics
        gtag('event', 'slideshow_view', {
            'product_id': productId,
            'slide_index': index
        });
    },
    
    beforeSlideChange: function(current, next) {
        // Preparar dados do próximo produto
        preloadProductData(next);
    }
});

function updateProductInfo(productId) {
    fetch(`/api/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.product-name').textContent = data.name;
            document.querySelector('.product-price').textContent = data.price;
        });
}
```

### Exemplo 4: Múltiplos Slideshows Sincronizados

```javascript
let currentSlideGlobal = 0;

// Slideshow principal (imagens grandes)
const mainSlideshow = new SerenitySlide({
    contentClass: '.slideshow-principal',
    effect: 'fade',
    autoPlay: true,
    
    onSlideChange: function(index) {
        currentSlideGlobal = index;
        thumbnailSlideshow.goToSlide(0, index);
    }
});

// Slideshow de thumbnails (sincronizado)
const thumbnailSlideshow = new SerenitySlide({
    contentClass: '.slideshow-thumbnails',
    effect: 'slide',
    autoPlay: false,
    navigation: {
        arrows: false,
        dots: false
    },
    
    onSlideChange: function(index) {
        if (index !== currentSlideGlobal) {
            mainSlideshow.goToSlide(0, index);
        }
    }
});
```

---

## 📞 Suporte

### Documentação

- 📖 [CHANGELOG.md](CHANGELOG.md) - Histórico de versões
- 📐 [Código Fonte Documentado](SerenitySlide.js) - Documentação inline completa

### Contato

- 🌐 **Website**: [https://www.syntaxserenity.co.ao](https://www.syntaxserenity.co.ao)
- 📧 **Email**: fs.developerfullstack@gmail.com
- 💼 **Empresa**: Syntax Serenity

### Reportar Bugs

Para reportar bugs ou solicitar features, entre em contato com nossa equipe de desenvolvimento.

---

## 📄 Licença

**Proprietary License**

© 2025 Todos os direitos autorais reservados | Desenvolvido pela Syntax Serenity

Este software é propriedade da Syntax Serenity. Todos os direitos reservados.  
Uso, cópia, modificação ou distribuição não autorizados são estritamente proibidos.

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ pela equipe **Syntax Serenity Development Team**.

> _"Serenidade em cada linha de código."_

---

**[⬆ Voltar ao topo](#-serenityslide-v100)**
