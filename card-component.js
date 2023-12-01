class CardComponent extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
    <style>
        :host {
            font-family: Inter, sans-serif;
            color: #000;
        }
        .card {
            width: fit-content;
            border: 3px solid #e2e2e2;
            border-radius: 1rem;
            padding: 1rem;
            margin-bottom: 2rem;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.5);
            transition: 0.2s all ease;
            transition-delay: 100ms;
        }
        .card:hover {
            scale: 1.05;
        }

        .card__header {
            font-weight: 700;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .card__content {
            font-weight: 400;
            font-size: 16px;
        }

        img {
            border-radius: 0.5rem;
            object-fit: contain;
            width: 350px;
            height: 350px;
        }
    </style>
    <div class="card">
        <slot name="image"></slot>
        <div class="card__header">
            <slot name="header"></slot>
        </div>
        <div class="card__content">
            <slot name="content"></slot>
        </div>
    </div>
    `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const headerSlot = this.shadowRoot.querySelector('slot[name="header"]');
        const contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
        const imageSlot = this.shadowRoot.querySelector('slot[name="image"]');

        const headerText = this.getAttribute('header');
        const contentText = this.getAttribute('content');
        const imageUrl = this.getAttribute('image');

        const headerNode = document.createTextNode(headerText);
        const contentNode = document.createTextNode(contentText);

        const imageExsits = imageUrl && imageUrl;
        if (imageExsits) {
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', imageUrl || '');
            imageElement.setAttribute('alt', 'Изображение: ' + headerText);
            imageSlot.appendChild(imageElement);

        }

        headerSlot.appendChild(headerNode);
        contentSlot.appendChild(contentNode);
    }
}

customElements.define('card-component', CardComponent);