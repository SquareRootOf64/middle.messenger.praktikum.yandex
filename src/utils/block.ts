import EventBus from "./EventBus";

type Events = Record<string, (event: Event) => void>;

interface Props {
    events?: Events;
    [key: string]: any;
}

abstract class Block<T extends Props> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: T };
    private _id: string;
    protected props: T;
    protected children: Record<string, Block<any>>;
    private eventBus: () => EventBus;

    constructor(tagName: string = "div", propsAndChildren: T) {
        const eventBus = new EventBus();
        const { children, props } = this._getChildren(propsAndChildren);

        this._meta = { tagName, props };
        this.props = this._makePropsProxy(props as T);
        this.children = children;

        this._id = Math.random().toString(36).substring(2, 15);
        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildren(propsAndChildren: T) {
        const children: Record<string, Block<any>> = {};
        const props: T = {} as T;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key as keyof T] = value;
            }
        });

        return { children, props };
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        const element = document.createElement(tagName);
        element.setAttribute("data-id", this._id);
        return element;
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    componentDidMount(oldProps?: T) {}

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const block = this.render();
        this._removeEvents();
        this._element!.innerHTML = "";
        this._element!.appendChild(block);
        this._addEvents();
    }

    protected abstract render(): DocumentFragment;

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props: T) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string | symbol) {
                const value = target[prop as keyof T];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string | symbol, value) {
                const oldProps = { ...target };
                target[prop as keyof T] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element!.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element!.removeEventListener(eventName, events[eventName]);
        });
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
