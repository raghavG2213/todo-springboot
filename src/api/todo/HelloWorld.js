import axios from "axios"

class HelloWorldService{

    executeHelloWorldService(){
        return axios.get("http://localhost:8080/hello-world")
    }

    executeHelloBeanService(){
        return axios.get("http://localhost:8080/hello-bean")
    }

    executeHelloWorldPathService(name){
        return axios.get(`http://localhost:8080/hello-bean/pv/${name}`)
    }
}

export default new HelloWorldService()