/**
 * ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                                                                                                                   ║
 * ║  ███████╗██╗   ██╗███╗   ██╗████████╗ █████╗ ██╗  ██╗███████╗█████╗██████╗ █████╗███╗   ██╗██╗████████╗██╗   ██╗  ║
 * ║  ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██╔══██╗╚██╗██╔╝██╔════╝██╔══╝██╔══██╗██╔══╝████╗  ██║██║╚══██╔══╝╚██╗ ██╔╝  ║
 * ║  ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║ ╚███╔╝ ███████╗█████╗██████╔╝█████╗██╔██╗ ██║██║   ██║    ╚████╔╝   ║
 * ║  ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║ ██╔██╗ ╚════██║██╔══╝██╔══██╗██╔══╝██║╚██╗██║██║   ██║     ╚██╔╝    ║
 * ║  ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║██╔╝ ██╗███████║█████╗██║  ██║█████╗██║ ╚████║██║   ██║      ██║     ║
 * ║  ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚════╝╚═╝  ╚═╝╚════╝╚═╝  ╚═══╝╚═╝   ╚═╝      ╚═╝     ║
 * ║                                R E L I A B I L I T Y   I N   E V E R Y   L I N E                                  ║
 * ║                                              O F   C O D E                                                        ║
 * ║                                                                                                                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * Class: serenitySlide
 *
 * DESCRIPTION:
 *   Biblioteca JavaScript avançada e flexível para criação de slideshows profissionais com múltiplos efeitos de transição.
 *   Projetada para oferecer controle total sobre apresentações visuais, suportando configurações responsivas,
 *   navegação completa (touch, teclado, mouse), autoplay inteligente com tempos variáveis por slide, e formatação
 *   automática de números. Ideal para galerias de imagens, banners rotativos, apresentações de produtos, e qualquer
 *   interface que necessite de transições visuais elegantes e profissionais.
 *
 * DESIGN PATTERN:
 *   - Pattern Principal: Module Pattern - Encapsulamento completo da lógica com API pública controlada
 *   - Padrões Secundários: 
 *     * Observer Pattern - Sistema de callbacks (onInit, onSlideChange, beforeSlideChange, afterSlideChange)
 *     * Strategy Pattern - Diferentes estratégias de efeitos de transição (slide, fade, scale, rotate, cube)
 *     * Singleton-like - Cada instância gerencia independentemente seus containers
 *
 * FEATURES:
 *   - Múltiplos efeitos de transição: slide, fade, scale, rotate, cube (configurável por slide)
 *   - Navegação completa: setas, dots, teclado (arrows), touch/swipe em dispositivos móveis
 *   - Autoplay inteligente com tempos configuráveis individualmente por slide
 *   - Responsividade avançada com breakpoints customizáveis (maxMedia, minMedia, respMedia)
 *   - Pause automático ao hover e retomada ao sair
 *   - Sistema de callbacks para integração personalizada
 *   - Formatação automática de números (abreviações K, M, B, T)
 *   - Suporte para múltiplos containers simultâneos na mesma página
 *   - API pública para controle programático (nextSlide, prevSlide, goToSlide, destroy)
 *
 * DEPENDENCIES:
 *   - Font Awesome: Para ícones de navegação (setas)
 *   - CSS SerenitySlide: Stylesheet complementar para estilização
 *
 * REQUIREMENTS:
 *   - ES6+ (Classes, Arrow Functions, Template Literals)
 *   - Navegadores modernos (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
 *   - Touch Events API (para suporte mobile)
 *
 * @package       frontend/components
 * @category      UI Components / Slideshow
 * @version       1.0.0
 * @since         2025-02-05
 * @license       Proprietary
 * @development   company: syntax serenity
 * @email         fs.developerfullstack@gmail.com
 * @link          https://www.syntaxserenity.co.ao
*/
class SerenitySlide {
 /**
     * CONSTRUCTOR: Inicializa instância do SerenitySlide
     * 
     * DESCRIPTION:
     *    - Valida opções fornecidas e lança erro se configuração obrigatória estiver ausente
     *    - Mescla configurações do usuário com defaults usando merge profundo
     *    - Inicializa propriedades de controle (containers, slides atuais, intervals, touch)
     *    - Executa inicialização automática dos containers e configurações
     * 
     * BUSINESS LOGIC:
     *    1. Valida presença de pelo menos uma forma de localizar containers (contentClass, contentId ou content)
     *    2. Define configurações padrão abrangentes (efeitos, tempos, navegação, formatação)
     *    3. Mescla configurações fornecidas com defaults preservando estrutura aninhada
     *    4. Inicializa arrays de controle para múltiplos containers
     *    5. Chama método init() para setup completo
     * 
     * ERROR HANDLING:
     *    - Ausência de contentClass/contentId/content → Lança Error com mensagem descritiva
     * 
     * @constructor
     * @param  {Object}  options  Objeto de configuração do slideshow
     * @param  {string}  [options.contentClass]  Seletor de classe CSS para containers
     * @param  {string}  [options.contentId]  ID do elemento container
     * @param  {HTMLElement}  [options.content]  Elemento DOM direto do container
     * @param  {number}  [options.slideCount=0]  Número de slides (auto-detectado se 0)
     * @param  {number}  [options.slideViews=1]  Número de slides visíveis simultaneamente
     * @param  {string|Array}  [options.effect='slide']  Efeito de transição (slide|fade|scale|rotate|cube ou array)
     * @param  {number|Array}  [options.timeViews=5000]  Tempo de exibição em ms (por slide se array)
     * @param  {boolean}  [options.autoPlay=true]  Ativar autoplay
     * @param  {boolean}  [options.pauseOnHover=true]  Pausar ao passar mouse
     * @param  {boolean}  [options.loop=true]  Loop infinito de slides
     * @param  {Object}  [options.navigation]  Configurações de navegação
     * @param  {Function}  [options.onInit]  Callback após inicialização
     * @param  {Function}  [options.onSlideChange]  Callback ao trocar slide
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 constructor(options = {}) {
     // Validação inicial
     this.validateOptions(options);
     
     // Configurações padrão
     this.defaults = {
         contentClass: null,
         contentId: null,
         content: null,
         slideCount: 0,
         slideViews: 1,
         effect: 'slide', // slide, fade, scale, rotate, cube
         timeViews: 5000, // tempo em milissegundos
         autoPlay: true,
         pauseOnHover: true,
         loop: true,
         navigation: {
             arrows: true,
             dots: true,
             keyboard: true,
             touch: true
         },
         slideClass: 'serenity-slide-item',
         activeClass: 'serenity-active',
         responsive: [],
         onSlideChange: null,
         onInit: null,
         beforeSlideChange: null,
         afterSlideChange: null,
         numberFormat: {
             abbreviate: false,
             thousandsSeparator: ' ',
             decimalSeparator: ',',
             abbreviations: {
                 thousand: 'K',
                 million: 'M',
                 billion: 'B',
                 trillion: 'T'
             }
         }
     }; 

     // Mesclar configurações
     this.config = this.mergeDeep(this.defaults, options);
     
      /**
         * @var Array containers - Coleção de elementos DOM que representam os containers de slideshow
         * @example this.containers = [HTMLDivElement, HTMLDivElement]
     */
     this.containers = [];
        
     /**
         * @var Array currentSlides - Índices dos slides atualmente ativos em cada container
         * @example this.currentSlides = [0, 2] // Container 0 no slide 0, Container 1 no slide 2
     */
     this.currentSlides = [];
        
     /**
         * @var Array intervals - Referências aos setTimeouts do autoplay de cada container
         * @example this.intervals = [timeoutId1, timeoutId2]
     */
     this.intervals = [];
        
     /**
         * @var number touchStartX - Posição X inicial do toque para cálculo de swipe
         * @example this.touchStartX = 150
     */
     this.touchStartX = 0;
        
     /**
         * @var number touchEndX - Posição X final do toque para cálculo de swipe
         * @example this.touchEndX = 50
     */
     this.touchEndX = 0;
        
     /**
         * @var boolean isTransitioning - Flag para prevenir múltiplas transições simultâneas
         * @example this.isTransitioning = true
     */
     this.isTransitioning = false;
        
     /**
         * @var Object|null currentBreakpoint - Breakpoint responsivo atualmente ativo
         * @example this.currentBreakpoint = { maxMedia: 768, effect: 'fade' }
     */
     this.currentBreakpoint = null;
     
     // Inicializar
     this.init();
 }

 /**
     * FUNCTION PURPOSE: Valida opções obrigatórias fornecidas ao construtor
     * 
     * DESCRIPTION:
     *    - Verifica se pelo menos uma forma de localizar containers foi fornecida
     *    - Essencial para evitar inicialização sem elementos DOM válidos
     * 
     * BUSINESS LOGIC:
     *    1. Verifica presença de contentClass OU contentId OU content
     *    2. Se nenhum estiver presente, lança erro descritivo
     * 
     * ERROR HANDLING:
     *    - Ausência de todas as opções → Lança Error
     * 
     * @function   validateOptions
     * @param  {Object}  options  Opções a serem validadas
     * @return {void}
     * @throws {Error}  Quando nenhuma opção de localização de container está presente
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 validateOptions(options) {
     if (!options.contentClass && !options.contentId && !options.content) {
         throw new Error('SerenitySlide: É necessário especificar contentClass, contentId ou content');
     }
 }

 /**
     * FUNCTION PURPOSE: Realiza merge profundo recursivo de objetos
     * 
     * DESCRIPTION:
     *    - Combina dois objetos preservando estruturas aninhadas
     *    - Source sobrescreve target em conflitos, mas preserva propriedades não conflitantes
     *    - Essencial para mesclar configurações do usuário com defaults mantendo objetos aninhados intactos
     * 
     * BUSINESS LOGIC:
     *    1. Cria cópia do objeto target para não mutar original
     *    2. Itera sobre cada chave do objeto source
     *    3. Se valor é objeto aninhado, chama mergeDeep recursivamente
     *    4. Se valor é primitivo ou array, sobrescreve diretamente
     *    5. Retorna objeto mesclado final
     * 
     * @function   mergeDeep
     * @param  {Object}  target  Objeto base (defaults)
     * @param  {Object}  source  Objeto a mesclar (configurações do usuário)
     * @return {Object}  Objeto resultante da mesclagem profunda
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 mergeDeep(target, source) {
     const output = Object.assign({}, target);
     if (this.isObject(target) && this.isObject(source)) {
         Object.keys(source).forEach(key => {
             if (this.isObject(source[key])) {
                 if (!(key in target)) {
                     Object.assign(output, { [key]: source[key] });
                 } else {
                     output[key] = this.mergeDeep(target[key], source[key]);
                 }
             } else {
                 Object.assign(output, { [key]: source[key] });
             }
         });
     }
     return output;
 }

 /**
     * FUNCTION PURPOSE: Verifica se um item é um objeto puro (não array, não null)
     * 
     * DESCRIPTION:
     *    - Validação auxiliar para merge profundo
     *    - Distingue objetos de arrays e valores primitivos
     * 
     * @function   isObject
     * @param  {*}  item  Item a ser verificado
     * @return {boolean}  true se for objeto puro, false caso contrário
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 isObject(item) {
     return item && typeof item === 'object' && !Array.isArray(item);
 }

 /**
     * FUNCTION PURPOSE: Inicializa toda a estrutura do slideshow
     * 
     * DESCRIPTION:
     *    - Orquestra todo o processo de setup inicial
     *    - Localiza containers, configura cada um, aplica responsividade
     *    - Ativa navegação e dispara callback de inicialização
     * 
     * BUSINESS LOGIC:
     *    1. Localiza todos os containers baseado em contentClass/contentId/content
     *    2. Para cada container encontrado, executa setupContainer()
     *    3. Configura sistema responsivo com breakpoints
     *    4. Ativa navegação por teclado se habilitada
     *    5. Dispara callback onInit se fornecido
     *    6. Loga informações de sucesso no console
     * 
     * @function   init
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 init() {
     // Encontrar containers
     this.findContainers();
     
     // Configurar cada container
     this.containers.forEach((container, index) => {
         this.setupContainer(container, index);
     }); 

     // Configurar responsividade
     this.setupResponsive(); 

     // Configurar navegação por teclado
     if (this.config.navigation.keyboard) {
         this.setupKeyboardNavigation();
     } 
     // Callback de inicialização
     if (typeof this.config.onInit === 'function') {
         this.config.onInit(this);
     } 
     console.log('SerenitySlide inicializado com sucesso!', {
         containers: this.containers.length,
         config: this.config
     });
 }

 /**
     * FUNCTION PURPOSE: Localiza elementos DOM que servirão como containers de slideshow
     * 
     * DESCRIPTION:
     *    - Processa diferentes formas de localização (elemento direto, ID, classe)
     *    - Popula array this.containers com elementos encontrados
     *    - Emite warning se nenhum container for encontrado
     * 
     * BUSINESS LOGIC:
     *    1. Verifica se config.content é HTMLElement direto → adiciona ao array
     *    2. Se não, verifica se config.contentId existe → busca por ID e adiciona
     *    3. Se não, usa config.contentClass → busca todos elementos com classe
     *    4. Se containers.length === 0 → emite console.warn
     * 
     * @function   findContainers
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 findContainers() {
     if (this.config.content) {
         // Elemento DOM direto
         if (this.config.content instanceof HTMLElement) {
             this.containers = [this.config.content];
         }
     } else if (this.config.contentId) {
         // Por ID
         const element = document.getElementById(this.config.contentId);
         if (element) {
             this.containers = [element];
         }
     } else if (this.config.contentClass) {
         // Por classe
         this.containers = Array.from(document.querySelectorAll(this.config.contentClass));
     } 
     if (this.containers.length === 0) {
         console.warn('SerenitySlide: Nenhum container encontrado');
     }
 }

 /**
     * FUNCTION PURPOSE: Configura completamente um container individual de slideshow
     * 
     * DESCRIPTION:
     *    - Setup completo de um container: estilização de slides, criação de controles, eventos
     *    - Aplica posicionamento absoluto e transições CSS a todos os slides
     *    - Cria elementos de navegação (arrows, dots) e configura interações (touch, hover)
     *    - Inicializa autoplay se habilitado
     * 
     * BUSINESS LOGIC:
     *    1. Adiciona classe 'serenity-slide-wrapper' ao container
     *    2. Localiza todos os elementos com slideClass dentro do container
     *    3. Valida se existem slides; se não, emite warning e retorna
     *    4. Atualiza slideCount se não foi definido manualmente
     *    5. Inicializa currentSlides[containerIndex] = 0
     *    6. Para cada slide: aplica estilos (position absolute, opacity 0, transições)
     *    7. Mostra o primeiro slide (índice 0)
     *    8. Cria setas de navegação se navigation.arrows === true
     *    9. Cria dots de navegação se navigation.dots === true
     *    10. Configura eventos touch se navigation.touch === true
     *    11. Configura pause on hover se pauseOnHover === true
     *    12. Inicia autoplay se autoPlay === true
     * 
     * ERROR HANDLING:
     *    - slides.length === 0 → Emite console.warn e retorna sem configurar
     * 
     * DEPENDENCIES:
     *    - this.showSlide(): Para exibir primeiro slide
     *    - this.createArrows(): Para criar elementos de navegação
     *    - this.createDots(): Para criar indicadores
     *    - this.setupTouch(): Para eventos touch
     *    - this.setupHover(): Para pause on hover
     *    - this.startAutoPlay(): Para iniciar autoplay
     * 
     * @function   setupContainer
     * @param  {HTMLElement}  container  Elemento DOM do container
     * @param  {number}  containerIndex  Índice do container no array this.containers
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */ 
 setupContainer(container, containerIndex) {
     // Adicionar classe wrapper
     container.classList.add('serenity-slide-wrapper');
     
     // Obter slides
     const slides = Array.from(container.querySelectorAll(`.${this.config.slideClass}`));
     
     if (slides.length === 0) {
         console.warn(`SerenitySlide: Nenhum slide encontrado no container ${containerIndex}`);
         return;
     } 
     // Atualizar slideCount se não foi definido
     if (this.config.slideCount === 0) {
         this.config.slideCount = slides.length;
     } 
     // Inicializar índice atual ANTES de configurar os slides
     this.currentSlides[containerIndex] = 0; 
     // Configurar slides
     slides.forEach((slide, index) => {
         slide.setAttribute('data-slide-index', index);
         slide.style.position = 'absolute';
         slide.style.top = '0';
         slide.style.left = '0';
         slide.style.width = '100%';
         slide.style.height = '100%';
         slide.style.opacity = '0';
         slide.style.visibility = 'hidden';
         
         // Obter efeito específico para este slide
         const slideEffect = this.getEffectForSlide(index);
         slide.style.transition = this.getTransition(slideEffect);
         
         // Armazenar o efeito no atributo data
         slide.setAttribute('data-slide-effect', slideEffect);
         
         // Formatar números se necessário
         if (this.config.numberFormat.abbreviate) {
             this.formatNumbers(slide);
         }
     }); 

     // Mostrar primeiro slide
     if (slides.length > 0) {
         // Não definir currentSlides aqui, já foi definido acima
         this.showSlide(containerIndex, 0);
     } 
     
     // Criar controles de navegação
     if (this.config.navigation.arrows) {
         this.createArrows(container, containerIndex);
     }

     if (this.config.navigation.dots) {
         this.createDots(container, containerIndex, slides.length);
     } 

     // Configurar touch
     if (this.config.navigation.touch) {
         this.setupTouch(container, containerIndex);
     } 
     
     // Configurar hover
     if (this.config.pauseOnHover) {
         this.setupHover(container, containerIndex);
     } 
     
     // Iniciar autoplay
     if (this.config.autoPlay) {
         this.startAutoPlay(containerIndex);
     }
 } 

 /**
     * FUNCTION PURPOSE: Retorna string de transição CSS apropriada para um efeito específico
     * 
     * DESCRIPTION:
     *    - Gera propriedades CSS transition otimizadas para cada tipo de efeito
     *    - Combina propriedades (opacity, transform, visibility) com durações e easings adequados
     * 
     * BUSINESS LOGIC:
     *    1. Define duration padrão de 800ms
     *    2. Determina efeito a usar (parâmetro ou primeiro do array de config)
     *    3. Switch case para cada efeito:
     *       - fade: apenas opacity e visibility
     *       - scale/rotate: opacity + transform com cubic-bezier + visibility
     *       - cube: transform + opacity + visibility
     *       - slide (default): transform + opacity + visibility
     *    4. Retorna string de transição CSS completa
     * 
     * @function   getTransition
     * @param  {string|null}  effect  Nome do efeito (opcional, usa config se null)
     * @return {string}  String CSS de transition
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 getTransition(effect = null) {
     const duration = 800;
     const effectToUse = effect || (Array.isArray(this.config.effect) ? this.config.effect[0] : this.config.effect);
     
     switch (effectToUse) {
         case 'fade':
             return `opacity ${duration}ms ease-in-out, visibility ${duration}ms ease-in-out`;
         case 'scale':
             return `opacity ${duration}ms ease-in-out, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), visibility ${duration}ms ease-in-out`;
         case 'rotate':
             return `opacity ${duration}ms ease-in-out, transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), visibility ${duration}ms ease-in-out`;
         case 'cube':
             return `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-in-out, visibility ${duration}ms ease-in-out`;
         case 'slide':
         default:
             return `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-in-out, visibility ${duration}ms ease-in-out`;
     }
 }
 
 /**
     * FUNCTION PURPOSE: Determina qual efeito de transição usar para um slide específico
     * 
     * DESCRIPTION:
     *    - Suporta efeito único (string) ou efeitos individuais por slide (array)
     *    - Permite configuração granular de transições diferentes para cada slide
     * 
     * BUSINESS LOGIC:
     *    1. Obtém config.effect
     *    2. Se for string → retorna esse efeito para todos os slides
     *    3. Se for array:
     *       - Se índice existe no array → retorna efeito correspondente
     *       - Se índice excede array → retorna último efeito do array
     *    4. Fallback para 'slide' se configuração inválida
     * 
     * @function   getEffectForSlide
     * @param  {number}  slideIndex  Índice do slide
     * @return {string}  Nome do efeito a aplicar
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 getEffectForSlide(slideIndex) {
     const effect = this.config.effect;
        
     // Se for string, retorna o efeito único para todos
     if (typeof effect === 'string') {
         return effect;
     }
        
     // Se for array, retorna o efeito para o índice específico
     if (Array.isArray(effect)) {
         // Se o índice existe no array, retorna o efeito correspondente
         if (slideIndex < effect.length) {
             return effect[slideIndex];
         }
         // Se não existe, retorna o último efeito definido
         return effect[effect.length - 1] || 'slide';
     }
        
     // Fallback
     return 'slide';
 }

 /**
     * FUNCTION PURPOSE: Exibe um slide específico com transição animada
     * 
     * DESCRIPTION:
     *    - Gerencia transição completa entre slide atual e próximo slide
     *    - Dispara callbacks, aplica efeitos visuais, atualiza indicadores
     *    - Previne múltiplas transições simultâneas com flag isTransitioning
     * 
     * BUSINESS LOGIC:
     *    1. Verifica se já está em transição → retorna se true
     *    2. Valida slideIndex dentro do range válido
     *    3. Obtém slide atual (se existir) e próximo slide
     *    4. Dispara callback beforeSlideChange se definido
     *    5. Seta flag isTransitioning = true
     *    6. Obtém efeito para o próximo slide
     *    7. Chama applyEffect() para executar transição visual
     *    8. Atualiza dots de navegação
     *    9. Atualiza currentSlides[containerIndex]
     *    10. Após 800ms: seta isTransitioning = false e dispara callbacks afterSlideChange e onSlideChange
     * 
     * ERROR HANDLING:
     *    - isTransitioning === true → Retorna sem fazer nada
     *    - slideIndex fora do range → Retorna sem fazer nada
     * 
     * DEPENDENCIES:
     *    - this.applyEffect(): Para executar transição visual
     *    - this.updateDots(): Para atualizar indicadores
     * 
     * @function   showSlide
     * @param  {number}  containerIndex  Índice do container
     * @param  {number}  slideIndex  Índice do slide a exibir
     * @param  {string}  direction  Direção da transição ('next' ou 'prev')
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 showSlide(containerIndex, slideIndex, direction = 'next') {
     if (this.isTransitioning) return;
     
     const container = this.containers[containerIndex];
     const slides = Array.from(container.querySelectorAll(`.${this.config.slideClass}`));
     
     if (slideIndex < 0 || slideIndex >= slides.length) return; 

     // Verificar se já existe um slide atual
     const currentSlideIndex = this.currentSlides[containerIndex];
     const hasCurrentSlide = currentSlideIndex !== undefined && currentSlideIndex !== null; 
     // Callback antes da mudança
     if (typeof this.config.beforeSlideChange === 'function') {
         this.config.beforeSlideChange(currentSlideIndex, slideIndex);
     } 
     this.isTransitioning = true;
     const currentSlide = hasCurrentSlide ? slides[currentSlideIndex] : null;
     const nextSlide = slides[slideIndex]; 
     // Obter efeito para o próximo slide
     const nextSlideEffect = this.getEffectForSlide(slideIndex); 
     // Aplicar efeito
     this.applyEffect(currentSlide, nextSlide, direction, nextSlideEffect); 
     // Atualizar dots
     this.updateDots(containerIndex, slideIndex); 
     // Atualizar índice atual
     this.currentSlides[containerIndex] = slideIndex; 
     // Callback após mudança
     setTimeout(() => {
         this.isTransitioning = false;
         
         if (typeof this.config.afterSlideChange === 'function') {
             this.config.afterSlideChange(slideIndex);
         } 
         if (typeof this.config.onSlideChange === 'function') {
             this.config.onSlideChange(slideIndex, slides[slideIndex]);
         }
     }, 800);
 }

 /**
     * FUNCTION PURPOSE: Aplica efeito visual de transição entre dois slides
     * 
     * DESCRIPTION:
     *    - Executa a transição visual CSS entre slide atual e próximo
     *    - Suporta múltiplos efeitos: slide, fade, scale, rotate, cube
     *    - Gerencia classes ativas e estilos inline para animações
     * 
     * BUSINESS LOGIC:
     *    1. Determina direção (next = true/false)
     *    2. Se não há slide atual (primeira inicialização):
     *       - Apenas mostra o próximo slide sem transição
     *    3. Para cada efeito (fade/scale/rotate/cube/slide):
     *       - Oculta slide atual (opacity 0, visibility hidden, transform específico)
     *       - Mostra próximo slide (opacity 1, visibility visible, transform reset)
     *       - Adiciona/remove classes activeClass
     *    4. Transformações específicas por efeito:
     *       - fade: apenas opacity
     *       - scale: scale(0.8) → scale(1)
     *       - rotate: rotateY(±90deg) → rotateY(0)
     *       - cube: translateZ + rotateY combinados
     *       - slide: translateX(±100%) → translateX(0)
     * 
     * @function   applyEffect
     * @param  {HTMLElement|null}  currentSlide  Slide atualmente visível (null na primeira vez)
     * @param  {HTMLElement}  nextSlide  Slide a ser exibido
     * @param  {string}  direction  Direção da transição ('next' ou 'prev')
     * @param  {string}  effect  Nome do efeito a aplicar
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 applyEffect(currentSlide, nextSlide, direction, effect = 'slide') {
     const isNext = direction === 'next';
     
     // Se não houver slide atual (primeira inicialização), apenas mostrar o próximo
     if (!currentSlide) {
         nextSlide.style.opacity = '1';
         nextSlide.style.visibility = 'visible';
         nextSlide.style.transform = 'translateX(0)';
         nextSlide.classList.add(this.config.activeClass);
         return;
     }
     
     switch (effect) {
         case 'fade':
             currentSlide.style.opacity = '0';
             currentSlide.style.visibility = 'hidden';
             
             nextSlide.style.opacity = '1';
             nextSlide.style.visibility = 'visible';
             nextSlide.classList.add(this.config.activeClass);
             currentSlide.classList.remove(this.config.activeClass);
             break; 
         case 'scale':
             currentSlide.style.transform = 'scale(0.8)';
             currentSlide.style.opacity = '0';
             currentSlide.style.visibility = 'hidden';
             
             nextSlide.style.transform = 'scale(1)';
             nextSlide.style.opacity = '1';
             nextSlide.style.visibility = 'visible';
             nextSlide.classList.add(this.config.activeClass);
             currentSlide.classList.remove(this.config.activeClass);
             break; 
         case 'rotate':
             currentSlide.style.transform = isNext ? 'rotateY(-90deg)' : 'rotateY(90deg)';
             currentSlide.style.opacity = '0';
             currentSlide.style.visibility = 'hidden';
             
             nextSlide.style.transform = 'rotateY(0deg)';
             nextSlide.style.opacity = '1';
             nextSlide.style.visibility = 'visible';
             nextSlide.classList.add(this.config.activeClass);
             currentSlide.classList.remove(this.config.activeClass);
             break; 
         case 'cube':
             currentSlide.style.transform = isNext ? 'translateZ(-200px) rotateY(-90deg)' : 'translateZ(-200px) rotateY(90deg)';
             currentSlide.style.opacity = '0';
             currentSlide.style.visibility = 'hidden';
             
             nextSlide.style.transform = 'translateZ(0) rotateY(0deg)';
             nextSlide.style.opacity = '1';
             nextSlide.style.visibility = 'visible';
             nextSlide.classList.add(this.config.activeClass);
             currentSlide.classList.remove(this.config.activeClass);
             break; 
         case 'slide':
         default:
             currentSlide.style.transform = isNext ? 'translateX(-100%)' : 'translateX(100%)';
             currentSlide.style.opacity = '0';
             currentSlide.style.visibility = 'hidden';
             
             nextSlide.style.transform = 'translateX(0)';
             nextSlide.style.opacity = '1';
             nextSlide.style.visibility = 'visible';
             nextSlide.classList.add(this.config.activeClass);
             currentSlide.classList.remove(this.config.activeClass);
             break;
     }
 } 

 /**
     * FUNCTION PURPOSE: Cria elementos HTML de setas de navegação
     * 
     * DESCRIPTION:
     *    - Gera botões prev/next com ícones Font Awesome
     *    - Adiciona event listeners para navegação por clique
     *    - Injeta elementos no container
     * 
     * BUSINESS LOGIC:
     *    1. Cria elemento button para seta anterior
     *    2. Aplica classes CSS e atributos aria
     *    3. Adiciona ícone chevron-left via Font Awesome
     *    4. Atribui onclick para chamar this.prevSlide()
     *    5. Repete processo para seta próxima (chevron-right, nextSlide())
     *    6. Anexa ambos os botões ao container DOM
     * 
     * DEPENDENCIES:
     *    - Font Awesome: Para ícones de setas
     * 
     * @function   createArrows
     * @param  {HTMLElement}  container  Container onde inserir setas
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 createArrows(container, containerIndex) {
     const prevArrow = document.createElement('button');
     prevArrow.className = 'serenity-arrow serenity-arrow-prev';
     prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
     prevArrow.setAttribute('aria-label', 'Anterior');
     prevArrow.onclick = () => this.prevSlide(containerIndex); 
     const nextArrow = document.createElement('button');
     nextArrow.className = 'serenity-arrow serenity-arrow-next';
     nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
     nextArrow.setAttribute('aria-label', 'Próximo');
     nextArrow.onclick = () => this.nextSlide(containerIndex); 
     container.appendChild(prevArrow);
     container.appendChild(nextArrow);
 }

 /**
     * FUNCTION PURPOSE: Cria elementos HTML de indicadores de navegação (dots)
     * 
     * DESCRIPTION:
     *    - Gera container de dots com um dot para cada slide
     *    - Primeiro dot inicia como ativo
     *    - Adiciona event listeners para navegação direta por clique
     * 
     * BUSINESS LOGIC:
     *    1. Cria elemento div container para todos os dots
     *    2. Loop por slideCount vezes:
     *       - Cria elemento span para cada dot
     *       - Se índice === 0, adiciona classe ativa
     *       - Atribui onclick para chamar goToSlide()
     *       - Anexa dot ao container de dots
     *    3. Anexa container de dots ao container principal
     * 
     * @function   createDots
     * @param  {HTMLElement}  container  Container onde inserir dots
     * @param  {number}  containerIndex  Índice do container
     * @param  {number}  slideCount  Número total de slides
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 createDots(container, containerIndex, slideCount) {
     const dotsContainer = document.createElement('div');
     dotsContainer.className = 'serenity-dots'; 
     for (let i = 0; i < slideCount; i++) {
         const dot = document.createElement('span');
         dot.className = 'serenity-dot';
         if (i === 0) dot.classList.add('serenity-dot-active');
         dot.onclick = () => this.goToSlide(containerIndex, i);
         dotsContainer.appendChild(dot);
     } 
     container.appendChild(dotsContainer);
 }

 /**
     * FUNCTION PURPOSE: Atualiza estado visual dos dots de navegação
     * 
     * DESCRIPTION:
     *    - Remove classe ativa de todos os dots
     *    - Adiciona classe ativa apenas ao dot correspondente ao slide atual
     * 
     * BUSINESS LOGIC:
     *    1. Localiza todos os elementos .serenity-dot no container
     *    2. Itera sobre cada dot:
     *       - Se índice === activeIndex → adiciona classe ativa
     *       - Caso contrário → remove classe ativa
     * 
     * @function   updateDots
     * @param  {number}  containerIndex  Índice do container
     * @param  {number}  activeIndex  Índice do slide ativo
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 updateDots(containerIndex, activeIndex) {
     const container = this.containers[containerIndex];
     const dots = container.querySelectorAll('.serenity-dot');
     
     dots.forEach((dot, index) => {
         if (index === activeIndex) {
             dot.classList.add('serenity-dot-active');
         } else {
             dot.classList.remove('serenity-dot-active');
         }
     });
 }

 /**
     * FUNCTION PURPOSE: Avança para o próximo slide
     * 
     * DESCRIPTION:
     *    - Calcula próximo índice considerando loop
     *    - Chama showSlide() com direção 'next'
     * 
     * BUSINESS LOGIC:
     *    1. Obtém slides do container
     *    2. Calcula nextIndex = currentIndex + 1
     *    3. Se nextIndex >= slides.length:
     *       - Se loop ativo → nextIndex = 0
     *       - Se loop inativo → nextIndex = currentIndex (não muda)
     *    4. Chama showSlide() com nextIndex e direção 'next'
     * 
     * @function   nextSlide
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 nextSlide(containerIndex) {
     const slides = this.containers[containerIndex].querySelectorAll(`.${this.config.slideClass}`);
     let nextIndex = this.currentSlides[containerIndex] + 1;
     
     if (nextIndex >= slides.length) {
         nextIndex = this.config.loop ? 0 : this.currentSlides[containerIndex];
     }
     
     this.showSlide(containerIndex, nextIndex, 'next');
 }

 /**
     * FUNCTION PURPOSE: Retrocede para o slide anterior
     * 
     * DESCRIPTION:
     *    - Calcula índice anterior considerando loop
     *    - Chama showSlide() com direção 'prev'
     * 
     * BUSINESS LOGIC:
     *    1. Obtém slides do container
     *    2. Calcula prevIndex = currentIndex - 1
     *    3. Se prevIndex < 0:
     *       - Se loop ativo → prevIndex = slides.length - 1
     *       - Se loop inativo → prevIndex = 0
     *    4. Chama showSlide() com prevIndex e direção 'prev'
     * 
     * @function   prevSlide
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 prevSlide(containerIndex) {
     const slides = this.containers[containerIndex].querySelectorAll(`.${this.config.slideClass}`);
     let prevIndex = this.currentSlides[containerIndex] - 1;
     
     if (prevIndex < 0) {
         prevIndex = this.config.loop ? slides.length - 1 : 0;
     }
     
     this.showSlide(containerIndex, prevIndex, 'prev');
 }

 /**
     * FUNCTION PURPOSE: Navega diretamente para um slide específico
     * 
     * DESCRIPTION:
     *    - Permite navegação direta via índice
     *    - Reinicia autoplay após navegação manual
     * 
     * BUSINESS LOGIC:
     *    1. Determina direção baseado em slideIndex vs currentSlide
     *    2. Chama showSlide() com índice e direção calculada
     *    3. Se autoPlay ativo:
     *       - Para autoplay atual
     *       - Reinicia autoplay com novo timing
     * 
     * @function   goToSlide
     * @param  {number}  containerIndex  Índice do container
     * @param  {number}  slideIndex  Índice do slide destino
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 goToSlide(containerIndex, slideIndex) {
     const direction = slideIndex > this.currentSlides[containerIndex] ? 'next' : 'prev';
     this.showSlide(containerIndex, slideIndex, direction);
     
     // Reiniciar autoplay
     if (this.config.autoPlay) {
         this.stopAutoPlay(containerIndex);
         this.startAutoPlay(containerIndex);
     }
 }

 /**
     * FUNCTION PURPOSE: Inicia autoplay automático de slides
     * 
     * DESCRIPTION:
     *    - Configura setTimeout recursivo para avanço automático
     *    - Suporta tempos variáveis por slide (array de timeViews)
     *    - Gerencia ciclo contínuo de avanço automático
     * 
     * BUSINESS LOGIC:
     *    1. Para qualquer autoplay existente primeiro
     *    2. Define função getTimeForSlide():
     *       - Se timeViews é array → retorna tempo específico do índice
     *       - Se timeViews é número → retorna valor fixo
     *       - Fallback para último valor do array ou 5000ms
     *    3. Define função recursiva autoPlayFunction():
     *       - Obtém tempo para slide atual
     *       - Cria setTimeout que após o tempo:
     *         * Chama nextSlide()
     *         * Chama autoPlayFunction() novamente (recursão)
     *    4. Inicia primeira execução de autoPlayFunction()
     * 
     * @function   startAutoPlay
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 startAutoPlay(containerIndex) {
     this.stopAutoPlay(containerIndex);
     
     const getTimeForSlide = (index) => {
         const timeViews = this.config.timeViews;
         
         if (Array.isArray(timeViews)) {
             return timeViews[index] || timeViews[timeViews.length - 1] || 5000;
         }
         return timeViews;
     }; 
     const autoPlayFunction = () => {
         const currentTime = getTimeForSlide(this.currentSlides[containerIndex]);
         
         this.intervals[containerIndex] = setTimeout(() => {
             this.nextSlide(containerIndex);
             autoPlayFunction();
         }, currentTime);
     }; 
     autoPlayFunction();
 }

 /**
     * FUNCTION PURPOSE: Para autoplay automático de um container
     * 
     * DESCRIPTION:
     *    - Limpa setTimeout ativo
     *    - Necessário para pausar em hover ou navegação manual
     * 
     * BUSINESS LOGIC:
     *    1. Verifica se existe interval ativo para o container
     *    2. Se existe:
     *       - Chama clearTimeout()
     *       - Seta intervals[containerIndex] = null
     * 
     * @function   stopAutoPlay
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 stopAutoPlay(containerIndex) {
     if (this.intervals[containerIndex]) {
         clearTimeout(this.intervals[containerIndex]);
         this.intervals[containerIndex] = null;
     }
 }

 /**
     * FUNCTION PURPOSE: Configura comportamento de pause on hover
     * 
     * DESCRIPTION:
     *    - Para autoplay ao passar mouse sobre container
     *    - Retoma autoplay ao tirar mouse
     * 
     * BUSINESS LOGIC:
     *    1. Adiciona listener mouseenter:
     *       - Chama stopAutoPlay()
     *    2. Adiciona listener mouseleave:
     *       - Se autoPlay ativo → chama startAutoPlay()
     * 
     * @function   setupHover
     * @param  {HTMLElement}  container  Container onde adicionar listeners
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 setupHover(container, containerIndex) {
     container.addEventListener('mouseenter', () => {
         this.stopAutoPlay(containerIndex);
     }); 
     container.addEventListener('mouseleave', () => {
         if (this.config.autoPlay) {
             this.startAutoPlay(containerIndex);
         }
     });
 }

 /**
     * FUNCTION PURPOSE: Configura suporte para gestos touch/swipe
     * 
     * DESCRIPTION:
     *    - Detecta gestos de swipe horizontal em dispositivos touch
     *    - Para autoplay durante swipe e retoma após
     * 
     * BUSINESS LOGIC:
     *    1. Listener touchstart:
     *       - Armazena posição X inicial do toque
     *       - Para autoplay
     *    2. Listener touchend:
     *       - Armazena posição X final do toque
     *       - Chama handleSwipe() para processar gesto
     *       - Retoma autoplay se ativo
     * 
     * @function   setupTouch
     * @param  {HTMLElement}  container  Container onde adicionar listeners
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 setupTouch(container, containerIndex) {
     container.addEventListener('touchstart', (e) => {
         this.touchStartX = e.changedTouches[0].screenX;
         this.stopAutoPlay(containerIndex);
     }); 
     container.addEventListener('touchend', (e) => {
         this.touchEndX = e.changedTouches[0].screenX;
         this.handleSwipe(containerIndex);
         
         if (this.config.autoPlay) {
             this.startAutoPlay(containerIndex);
         }
     });
 }

 /**
     * FUNCTION PURPOSE: Processa gesto de swipe e navega slides
     * 
     * DESCRIPTION:
     *    - Calcula diferença entre posições touch start/end
     *    - Determina direção e aciona navegação se threshold atingido
     * 
     * BUSINESS LOGIC:
     *    1. Define threshold mínimo de 50px para considerar swipe válido
     *    2. Calcula diff = touchStartX - touchEndX
     *    3. Se |diff| > threshold:
     *       - diff > 0 (swipe esquerda) → nextSlide()
     *       - diff < 0 (swipe direita) → prevSlide()
     * 
     * @function   handleSwipe
     * @param  {number}  containerIndex  Índice do container
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 handleSwipe(containerIndex) {
     const swipeThreshold = 50;
     const diff = this.touchStartX - this.touchEndX; 
     if (Math.abs(diff) > swipeThreshold) {
         if (diff > 0) {
             this.nextSlide(containerIndex);
         } else {
             this.prevSlide(containerIndex);
         }
     }
 }

 /**
     * FUNCTION PURPOSE: Configura navegação global por teclado
     * 
     * DESCRIPTION:
     *    - Permite controle de todos os containers via teclas de seta
     *    - Event listener único para todo o documento
     * 
     * BUSINESS LOGIC:
     *    1. Adiciona listener keydown no document
     *    2. Se tecla === ArrowLeft:
     *       - Chama prevSlide() para todos os containers
     *    3. Se tecla === ArrowRight:
     *       - Chama nextSlide() para todos os containers
     * 
     * @function   setupKeyboardNavigation
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 setupKeyboardNavigation() {
     document.addEventListener('keydown', (e) => {
         if (e.key === 'ArrowLeft') {
             this.containers.forEach((_, index) => this.prevSlide(index));
         } else if (e.key === 'ArrowRight') {
             this.containers.forEach((_, index) => this.nextSlide(index));
         }
     });
 }

 /**
     * FUNCTION PURPOSE: Configura sistema responsivo com breakpoints
     * 
     * DESCRIPTION:
     *    - Monitora largura da janela e aplica configurações específicas por breakpoint
     *    - Suporta maxMedia, minMedia e respMedia (range)
     *    - Atualiza configurações dinamicamente sem reinicializar
     * 
     * BUSINESS LOGIC:
     *    1. Verifica se config.responsive existe e tem elementos
     *    2. Define função checkBreakpoint():
     *       - Obtém largura atual da janela
     *       - Itera sobre cada breakpoint definido
     *       - Para cada um, verifica se largura atual corresponde:
     *         * maxMedia: width <= valor
     *         * minMedia: width >= valor
     *         * respMedia: width dentro do range [min, max]
     *       - Armazena último breakpoint que corresponder
     *    3. Se breakpoint mudou:
     *       - Chama applyBreakpoint()
     *       - Atualiza currentBreakpoint
     *    4. Adiciona listener resize para monitorar mudanças
     *    5. Executa checkBreakpoint() inicial
     * 
     * @function   setupResponsive
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 setupResponsive() {
     if (!this.config.responsive || this.config.responsive.length === 0) return; 
     const checkBreakpoint = () => {
         const width = window.innerWidth;
         let matchedBreakpoint = null; 
         // Processar breakpoints na ordem (último tem prioridade)
         for (const breakpoint of this.config.responsive) {
             let matches = false; 
             if (breakpoint.maxMedia !== undefined) {
                 matches = width <= breakpoint.maxMedia;
             } else if (breakpoint.minMedia !== undefined) {
                 matches = width >= breakpoint.minMedia;
             } else if (breakpoint.respMedia !== undefined) {
                 if (Array.isArray(breakpoint.respMedia) && breakpoint.respMedia.length === 2) {
                     matches = width >= breakpoint.respMedia[0] && width <= breakpoint.respMedia[1];
                 } else if (typeof breakpoint.respMedia === 'number') {
                     matches = width === breakpoint.respMedia;
                 }
             } 
             if (matches) {
                 matchedBreakpoint = breakpoint;
             }
         } 
         if (matchedBreakpoint !== this.currentBreakpoint) {
             this.applyBreakpoint(matchedBreakpoint);
             this.currentBreakpoint = matchedBreakpoint;
         }
     }; 
     // Verificar no load e no resize
     window.addEventListener('resize', checkBreakpoint);
     checkBreakpoint();
 } 

 /**
     * FUNCTION PURPOSE: Aplica configurações de um breakpoint responsivo
     * 
     * DESCRIPTION:
     *    - Atualiza configurações quando breakpoint é ativado
     *    - Ajusta visibilidade de controles e reinicia autoplay
     * 
     * BUSINESS LOGIC:
     *    1. Se breakpoint === null → retorna (restauração futura)
     *    2. Aplica cada configuração presente no breakpoint:
     *       - slideViews
     *       - effect
     *       - timeViews
     *       - navigation (merge com config atual)
     *    3. Se navigation foi atualizada:
     *       - Para cada container:
     *         * Atualiza display de arrows
     *         * Atualiza display de dots
     *    4. Reinicia autoplay em todos os containers com novas configurações
     * 
     * @function   applyBreakpoint
     * @param  {Object|null}  breakpoint  Objeto de configuração do breakpoint
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 applyBreakpoint(breakpoint) {
     if (!breakpoint) {
         // Restaurar configurações padrão
         return;
     } 
     // Aplicar configurações do breakpoint
     if (breakpoint.slideViews !== undefined) {
         this.config.slideViews = breakpoint.slideViews;
     } 
     if (breakpoint.effect !== undefined) {
         this.config.effect = breakpoint.effect;
     } 
     if (breakpoint.timeViews !== undefined) {
         this.config.timeViews = breakpoint.timeViews;
     } 
     if (breakpoint.navigation !== undefined) {
         this.config.navigation = { ...this.config.navigation, ...breakpoint.navigation };
         
         // Atualizar visibilidade dos controles
         this.containers.forEach(container => {
             const arrows = container.querySelectorAll('.serenity-arrow');
             const dots = container.querySelector('.serenity-dots'); 
             arrows.forEach(arrow => {
                 arrow.style.display = this.config.navigation.arrows ? 'flex' : 'none';
             }); 
             if (dots) {
                 dots.style.display = this.config.navigation.dots ? 'flex' : 'none';
             }
         });
     } 
     // Reiniciar slides com novas configurações
     this.containers.forEach((container, index) => {
         this.stopAutoPlay(index);
         if (this.config.autoPlay) {
             this.startAutoPlay(index);
         }
     });
 }

 /**
     * FUNCTION PURPOSE: Formata todos os números em um elemento
     * 
     * DESCRIPTION:
     *    - Localiza elementos com atributo data-number
     *    - Aplica formatação configurada (abreviações)
     * 
     * BUSINESS LOGIC:
     *    1. Busca todos os elementos com [data-number] dentro do elemento
     *    2. Para cada elemento encontrado:
     *       - Extrai valor do atributo data-number
     *       - Converte para float
     *       - Chama formatNumber()
     *       - Atualiza textContent com valor formatado
     * 
     * @function   formatNumbers
     * @param  {HTMLElement}  element  Elemento raiz para buscar números
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 formatNumbers(element) {
     const numbers = element.querySelectorAll('[data-number]');
     
     numbers.forEach(numElement => {
         const value = parseFloat(numElement.getAttribute('data-number'));
         numElement.textContent = this.formatNumber(value);
     });
 }

 /**
     * FUNCTION PURPOSE: Formata número individual com abreviações
     * 
     * DESCRIPTION:
     *    - Converte números grandes em formato abreviado (K, M, B, T)
     *    - Suporta localização portuguesa se abbreviate === false
     * 
     * BUSINESS LOGIC:
     *    1. Se abbreviate === false:
     *       - Retorna número com locale português (separadores de milhares)
     *    2. Se abbreviate === true:
     *       - Calcula valor absoluto
     *       - Preserva sinal (negativo)
     *       - Verifica magnitude:
     *         * >= 1 trilhão → divide por 1e12, adiciona 'T'
     *         * >= 1 bilhão → divide por 1e9, adiciona 'B'
     *         * >= 1 milhão → divide por 1e6, adiciona 'M'
     *         * >= 1 mil → divide por 1e3, adiciona 'K'
     *         * < 1 mil → retorna número sem abreviação
     *       - Fixa 1 casa decimal para valores abreviados
     * 
     * @function   formatNumber
     * @param  {number}  value  Número a ser formatado
     * @return {string}  Número formatado com ou sem abreviação
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 formatNumber(value) {
     const config = this.config.numberFormat;
     
     if (!config.abbreviate) {
         return value.toLocaleString('pt', {
             useGrouping: true
         });
     } 
     const abs = Math.abs(value);
     const sign = value < 0 ? '-' : ''; 
     if (abs >= 1e12) {
         return sign + (abs / 1e12).toFixed(1) + config.abbreviations.trillion;
     } else if (abs >= 1e9) {
         return sign + (abs / 1e9).toFixed(1) + config.abbreviations.billion;
     } else if (abs >= 1e6) {
         return sign + (abs / 1e6).toFixed(1) + config.abbreviations.million;
     } else if (abs >= 1e3) {
         return sign + (abs / 1e3).toFixed(1) + config.abbreviations.thousand;
     }
     
     return sign + abs.toString();
 }

 /**
     * FUNCTION PURPOSE: Destrói completamente a instância do SerenitySlide
     * 
     * DESCRIPTION:
     *    - Remove todos os event listeners e elementos criados
     *    - Para autoplay e limpa referências
     *    - Necessário para cleanup quando slideshow não é mais necessário
     * 
     * BUSINESS LOGIC:
     *    1. Para todos os autoplay ativos em todos os containers
     *    2. Para cada container:
     *       - Remove todos os elementos .serenity-arrow
     *       - Remove todos os elementos .serenity-dot
     *       - Remove container .serenity-dots
     *    3. Loga mensagem de destruição no console
     * 
     * @function   destroy
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 destroy() {
     // Parar todos os autoplay
     this.intervals.forEach((_, index) => {
         this.stopAutoPlay(index);
     }); 
     // Remover event listeners
     this.containers.forEach(container => {
         const arrows = container.querySelectorAll('.serenity-arrow');
         const dots = container.querySelectorAll('.serenity-dot'); 
         arrows.forEach(arrow => arrow.remove());
         dots.forEach(dot => dot.remove());
         
         container.querySelector('.serenity-dots')?.remove();
     }); 
     console.log('SerenitySlide destruído');
 }

 /**
     * FUNCTION PURPOSE: Atualiza configuração da instância existente
     * 
     * DESCRIPTION:
     *    - Permite atualizar configurações sem criar nova instância
     *    - Destrói e reinicializa com novas configurações
     * 
     * BUSINESS LOGIC:
     *    1. Mescla newConfig com config atual usando mergeDeep
     *    2. Chama destroy() para limpar instância atual
     *    3. Chama init() para reinicializar com novas configurações
     * 
     * @function   updateConfig
     * @param  {Object}  newConfig  Objeto com novas configurações
     * @return {void}
     * 
     * @since     2025-02-05
     * @version   1.0.0
     * @author    Syntax Serenity Development Team
 */
 updateConfig(newConfig) {
     this.config = this.mergeDeep(this.config, newConfig);
     
     // Reinicializar
     this.destroy();
     this.init();
 }
}

// Exportar para uso global
if (typeof window !== 'undefined') {window.SerenitySlide = SerenitySlide;}

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {module.exports = SerenitySlide;}
