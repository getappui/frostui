export type Alignment = 'start' | 'end'
export type Side = 'top' | 'right' | 'bottom' | 'left'
export type AlignedPlacement = `${Side}-${Alignment}`
export type Placement = Side | AlignedPlacement

export interface BaseComponentOption {

}

export interface CollapseOption extends BaseComponentOption {
    toggle?: boolean
    target?: string | HTMLElement
}

export interface AccordionOption extends BaseComponentOption {

}

export interface DropdownOption extends BaseComponentOption {
    target?: string | HTMLElement,
    placement?: Placement,
    trigger?: 'hover' | 'click'
}

export interface ModalOption extends BaseComponentOption {
    target?: string | HTMLElement,
    behavior?: 'static' | 'default'
}

export interface OffcanvasOption extends BaseComponentOption {
    target?: string | HTMLElement,
    behavior?: 'static' | 'default'
    scroll?: boolean,
    backdrop?: boolean
}

export interface TabOption extends BaseComponentOption {

}

export interface TooltipOption extends BaseComponentOption {
    placement?: Placement,
    trigger?: 'click' | 'hover'
}

export interface DismissableOption extends BaseComponentOption {
    target?: string | HTMLElement
}
