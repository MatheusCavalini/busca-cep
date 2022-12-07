import { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"

const apiUrl = "https://viacep.com.br/ws/"

const Home = () => {

    const [cep, setCep] = useState("")
    const [cepInvalido, setCepInvalido] = useState(null)
    const [resultCep, setResultCep] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!cep || cep.length !== 8) cepError()

        const res = await fetch(`${apiUrl}${cep}/json`)
        const data = await res.json()

        if(data.erro) {
            cepError()
        }

        setResultCep(data)
        setCepInvalido(false)
        setCep("")
    }

    const cepError = () => {
        setCepInvalido(true)
        setResultCep(null)
        return
    }

    return (
        <div className='container'>
            <div className="title">
                <h1>Busca</h1><span>CEP</span>
            </div>
            <form onSubmit={handleSubmit}>        
                <input 
                    type="text" 
                    maxLength="8" 
                    onChange={(e)=> setCep(e.target.value)} 
                    value={cep}/>
                <button type="submit">
                    <BiSearchAlt/>
                </button>
            </form>
            {cepInvalido && (
                <>
                <div className="result">
                    <span>CEP inválido.</span>
                </div>
                </>
            )}
            {resultCep && (
                <>
                <div className="result">
                    <p>Cep:</p>
                    <span>{resultCep.cep}</span>
                    <p>Localidade:</p>
                    <span>{resultCep.localidade}</span>
                    <p>Bairro:</p>
                    <span>{resultCep.bairro}</span>
                    <p>Logradouro:</p>
                    <span>{resultCep.logradouro}</span>
                </div>
                </>
            )}
            
        </div>
    )
}

export default Home