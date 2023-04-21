import { IThemeType } from '~/types/states'

export type IAlignment = 'start' | 'end'
export type ISide = 'top' | 'right' | 'bottom' | 'left'
export type IAlignedPlacement = `${ISide}-${IAlignment}`
export type IPlacement = ISide | IAlignedPlacement

export type IThemeSwitcherTrigger = 'never' | 'switch' | 'auto';
export type IDropdownAutoclose = 'outside' | 'inside' | 'both';
export type IDropdownTrigger = 'hover' | 'click';

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
    placement?: IPlacement,
    trigger?: IDropdownTrigger,
    autoclose?: IDropdownAutoclose
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
    placement?: IPlacement,
    trigger?: 'click' | 'hover'
}

export interface DismissableOption extends BaseComponentOption {
    target?: string | HTMLElement
}

export interface ThemeSwitcherOption extends BaseComponentOption {
    theme?: IThemeType,
    trigger?: IThemeSwitcherTrigger
}
