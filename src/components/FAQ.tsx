import Accordion from "./Accordion";

const FAQ = () => {
    return (
        <div className="p-10 px-1 bg-bgCustom  rounded-lg max-w-full ">
            <Accordion title="AnVigilants é pago?" answer="Não, nossa plataforma é 100% gratuita." />
            <Accordion title="Quem pode criar conta na AnVigilants?" answer="Qualquer cidadão com idade acima dos 14 anos." />
            <Accordion title="Meus dados estão seguros no AnVigilants?" answer="Sim, os dados são criptografados e a plataforma segue as diretrizes da Lei Geral de Proteção de Dados (LGPD)." />
            <Accordion title="Posso fazer uma denúncia anônima?" answer="Sim, todas as denúncias são anônimas. O cadastro serve para o acompanhamento do status da sua solicitação." />
            <Accordion title="Por que é necessário usar o CPF para fazer o cadastro?" answer="O CPF é solicitado para garantir que a denúncia foi feita por um cidadão e evitar fraudes." />
            <Accordion title="Posso criar uma conta com o Google?" answer="Sim, disponibilizamos conexão com o Google." />
            <Accordion title="Quem tem acesso as denúncias?" answer="As prefeituras tem o acesso de todas as denúncias realizadas em seus respectivos municípios." />
            <Accordion title="Como faço para cadastrar um novo município?" answer="Atualmente, só atendemos a cidade de São Paulo e as demais da região metropolitana do estado. Caso queira sugerir a inclusão de uma nova região, contate-nos através do nosso formulário." />
        </div>
    );
};

export default FAQ;