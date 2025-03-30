import { useEffect, useState} from "react";
import { IMenuItem } from "../utils/types";
import { LeafLiLine, MenuItem } from "./MenuItem";
import "../utils/navContent.css";
import { NavigationContext } from "../utils/const";



const NavContent = () => {
    const [data, setData] = useState([]);
    const [selectedValue, setSelectValue] = useState<any>(null);
    const selectNavItem = (value: string | number | null) => {
        setSelectValue(value === selectedValue ? null : value);
    };
    useEffect(() => {
            let data: any = [];
            for (let i = 0; i < 20; i++) {
                let subData: any = [];
                for(let j=0; j<5; j++) {
                    subData.push({id: + i + "_" + j, title: "SubMenu " + j});
                }
                data.push({id: i + '', title: "Menu " + i, children: subData});
            }
            setData(data);
        }, []);

        const createTree: any = (tree: IMenuItem[]) => {
            return tree.map((item: IMenuItem) => {
                if(item.children) {
                    return <MenuItem key={item.id} item={item}>{createTree(item.children)}</MenuItem>
                } else {
                    return <NavigationContext.Provider key={item.id} value={{selectedValue, selectNavItem}}>
                        <LeafLiLine key={item.id} item={item}/>
                        </NavigationContext.Provider>
                }
            }) 
        };

        
    
    return (
        <>
        <span>Навигация</span>
        <div className="menulist">
            <ul>
            {createTree(data)}
            </ul>
        </div>
        </>
        
    );
};

export default NavContent;