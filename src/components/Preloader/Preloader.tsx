import preload from '../../assets/Pulse-1s-200px.svg'

export const Preloader = () => {
    return <div style={{margin: "0", textAlign: "center", display: "block"}}>
        <img alt={'preloader'} src={preload}/>
    </div>
}