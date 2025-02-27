import { useMemo } from "react";
import YooptaEditor, { createYooptaEditor, YooptaContentValue } from "@yoopta/editor";
// Pluggins
import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import { HeadingOne, HeadingTwo, HeadingThree } from '@yoopta/headings';
import Code from "@yoopta/code";
import Embed from "@yoopta/embed";
import Link from "@yoopta/link";
import Image from "@yoopta/image";
// Tools
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import ActionMenu, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
// Marks
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';

const plugins = [Paragraph, Blockquote, Code, HeadingOne, HeadingTwo, HeadingThree, Embed, Link, Image];
const TOOLS = {
    Toolbar: {
        tool: Toolbar,
        render: DefaultToolbarRender,
    },
    ActionMenu: {
        tool: ActionMenu,
        render: DefaultActionMenuRender,
    },
    LinkTool: {
        tool: LinkTool,
        render: DefaultLinkToolRender,
    },
};
const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];
type YooptaProps = {
    value: YooptaContentValue;
    setValue: (value: YooptaContentValue) => void;
    block: boolean
};

const Yoopta = ({ value, setValue, block }: YooptaProps) => {
    const editor = useMemo(() => createYooptaEditor(), []);

    const onChange = (value: YooptaContentValue) => {
        setValue(value);
    };

    return (
        <YooptaEditor
            editor={editor}
            plugins={plugins}
            placeholder="Escribe algo..."
            value={value}
            onChange={onChange}
            tools={TOOLS}
            marks={MARKS}
            style={{ width: "100%"}}
            readOnly={block}
        />
    );
};

export default Yoopta;