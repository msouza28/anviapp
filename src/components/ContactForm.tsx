const ContactForm = () => {

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-bgCustom rounded-lg shadow-md border whiteCustom">
            <h2 className="text-3xl text-center text-whiteCustom font-bold mb-6">Fale com nossa equipe</h2>
            <form action="">
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="nome">Nome</label>
                    <input id="nome" placeholder="Paulo" className="w-full px-3 py-2 border rounded-lg bg-bgCustom text-white focus:border-white-600"  />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">E-mail</label>
                    <input id="email" placeholder="exemplo@exemplo.com" className="w-full px-3 py-2 border rounded-lg bg-bgCustom text-white focus:border-white-600"  />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="mensagem">Sua mensagem</label>
                    <textarea id="mensagem" placeholder="Escreva sua mensagem" className="w-full px-3 py-2 border rounded-lg bg-bgCustom text-white focus:border-white-600" ></textarea>
                </div>
                <div>
                    <button type="button" onClick={() => {alert("Ainda em fase de implementação.")}} className="bg-bgCustom p-2 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-2 border-white-600">Envie sua mensagem</button>
                </div>
            </form>
        </div>
    );
};
export default ContactForm;