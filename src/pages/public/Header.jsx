import logo from "/src/assets/logo.png";

function Header() {
    return(
        <header>
            <img className="logo" src={logo} alt="Casa da Criança" />

            <div className="navbar">
                <h2 className="link"><a>Home</a></h2>
                <h2 className="link"><a>Quem Somos</a></h2>
                <h2 className="link"><a>Transparência</a></h2>
                <h2 className="link"><a>Doações</a></h2>
                <h2 className="link"><a>Atividade da Casa</a></h2>
                <h2 className="link"><a>Voluntáriado</a></h2>
                <h2 className="link"><a>Instalações</a></h2>
                <h2 className="link"><a>Ações</a></h2>
                <h2 className="link"><a>Mais</a></h2>
            </div>
        </header>
    );
}
export default Header;