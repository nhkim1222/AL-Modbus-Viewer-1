import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    a {
        text-decoration: none;
        color: inherit;
    };
    *{
        box-sizing: border-box;
    };
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 12px;
        background-color: rgba(20,20,20,1);
        color: white;
        margin: 0px;
        display: flex;
        box-sizing: border-box;
        overflow: hidden;
        height: 100%;
    };
    html{
        height: 100%
    }
    #root{
        display: flex;
        box-sizing: border-box;
        overflow: hidden;
        height: 100%;
        width:100%;
    }
`;

export default GlobalStyle;
