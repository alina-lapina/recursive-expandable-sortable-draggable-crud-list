import React, {useState, useEffect} from "react";
import "./list.css";

export const List = ({listitems = [],
                         controls = [
                             {name: "expand", order: -1},
                             {name: "include", order: 1, callback: (i) => console.log("include", i.title)}
                         ]}) => {

    const [items, setItems] = useState(listitems);
    useEffect(() => console.log({ list: items }),[items]);
    useEffect(() => setItems(listitems),[listitems]);

    return (
        <ul className="list">
            {items.map((item, i) =>
                <ListItem key={i} item={item} controls={controls} setItems={()=> setItems([...items])} />)}
        </ul>
    )
};

export const ListItem = ({controls, item, setItems}) => {

    function filterControls(property) {
        return Object.keys(controls).reduce((p, c) => {
            if (controls[c][property]) p[c] = controls[c];
            return p;
        }, {})
    }

    return (
        <li>
            <Controls
                item={item}
                setItems={()=> setItems()}
                controls={controls.filter(control => control.order < 0)}
            />
            <span>{item.title}</span>
            <Controls
                item={item}
                setItems={()=> setItems()}
                controls={controls.filter(control => control.order > 0)}
            />
            {item.expanded && <List listitems={item.children} controls={controls} />}
        </li>
    )
};

export const Controls = ({item, setItems, controls}) => {
    return (
        <span>
            {controls.find(c => c.name === "expand") && item.children && item.children.length > 0 &&
            <button onClick={() => {
                item.expanded = !item.expanded;
                setItems();}}
            >{item.expanded ? "ᐃ" : "ᐁ"}
            </button>
            }

            {controls.find(c => c.name === "include") &&
            <input type="checkbox" name="include" checked={item.checked}
                   onChange={(e) => {
                       item.checked = !item.checked;
                       setItems();
                       controls.find(c => c.name === "include").callback(item);
                   }} />
            }
    </span>)
};
