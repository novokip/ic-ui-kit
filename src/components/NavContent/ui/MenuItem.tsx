import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useState } from "react";
import { IMenuItem } from "../utils/types";

interface Props {
    children?: ReactNode;
    item?: IMenuItem;
}
interface IMenuItemContext {
    expand?: boolean;
    expandTree?: () => void;
}
const MenuItemContext = createContext<IMenuItemContext>({});

const LiLine = ({item}: {item: IMenuItem}) => {
    const {expandTree, expand} = useContext(MenuItemContext);
    return <li key={'li' + item.id} className={!expand ? "caret" : "expand"} onClick={() => expandTree && expandTree()}>
        <span key={"span" + item.id} >{item.title}</span>
        <span className="arrow"></span>
        {/* <img src="./free-icon-font-angle-small-down-3916864.svg" height="1em"/> */}
        </li>
}

const ChildrenUi = (props: Props) => {
    // const {expand} = useContext(MenuItemContext);
    // return <ul className={expand ? "active" : " nested"}>
        return <ul className="nested">
                {props.children}
                </ul>
}

export const LeafLiLine =({item}: Props) => {
    // const {selectedValue, selectNavItem} = useContext(NavigationContext);
    const selectItem = (itemId: string) => {
        const leafArr = document.getElementsByClassName("selectedLeaf");
        console.log(leafArr);
        let deselectAll = false;
        if(leafArr?.length) {
            for(let i=0; i< leafArr.length; i++){
                deselectAll = leafArr[i].getAttribute('id') === itemId;
                leafArr[i].classList.toggle("selectedLeaf");
            }
        }
        if(!deselectAll) document.getElementById(itemId)?.classList.toggle("selectedLeaf");

    };
    if (!item) return null;
    return <li key={item.id} id={item.id} className="leaf" onClick={() => selectItem(item.id)}>
        <span key={"span" + item.id} >{item.title}</span>
        </li>
}

export const MenuItem: FunctionComponent<Props> = ({item, children})  => {
    const [expand, setExpand] = useState(false);
    const expandTree = useCallback(() => {
        setExpand(prev => !prev);
    }, [])
    if (!item)return null;  
    return<>
        <MenuItemContext.Provider value={{expand, expandTree}}>
        <LiLine key={'LiLine' + item.id} item={item}/>
        </MenuItemContext.Provider>
        <ChildrenUi key={'ChildrenUi' + item.id}>{children}</ChildrenUi>
    </>
}