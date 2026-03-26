export function injectGlobalStyles(cssString) {
    const style = document.createElement('style');
    style.textContent = cssString;
    document.head.appendChild(style);
}

export const globalStyles = `
    * { box-sizing: border-box; }
    body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        margin: 0; 
        padding: 20px; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
    }
    #app { max-width: 700px; margin: 0 auto; }
    .task-item { 
        display: flex; 
        justify-content: space-between; 
        align-items: center;
        padding: 15px; 
        margin-bottom: 10px;
        background: white; 
        border-radius: 8px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }
    .task-item:hover { transform: translateY(-2px); }
    button { 
        cursor: pointer; 
        padding: 8px 16px; 
        border: none; 
        border-radius: 6px; 
        font-weight: 500;
        transition: background 0.2s;
    }
    button:hover { opacity: 0.9; }
    button.delete { background: #ff4757; color: white; }
    input[type="text"] { 
        padding: 10px; 
        border: 2px solid #ddd; 
        border-radius: 6px; 
        font-size: 14px;
    }
    input[type="text"]:focus { 
        outline: none; 
        border-color: #667eea; 
    }
    input[type="checkbox"] { 
        width: 18px; 
        height: 18px; 
        cursor: pointer;
    }
    .task-form { 
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        margin-bottom: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .task-list { min-height: 100px; }
    @media (max-width: 600px) {
        body { padding: 10px; }
        .task-item { flex-direction: column; gap: 10px; }
    }
`;
