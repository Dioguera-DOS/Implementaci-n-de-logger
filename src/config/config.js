const dotenv = require('dotenv');
const {Command} = require('commander');


//config  para multiples ambiates
const program=new Command();

program.option("-m, --mode <mode>","Execution mode to script (prod/dev)","prod")


program.parse()

let opts = program.opts()
let validsModes = ["prod", "dev"];


// if(!opts.mode.toLowerCase() === null || !opts.mode.toLowerCase()===''){
//     console.log("Select a mode.(Dev or Prod)!!!!!!")
//     process.exit()
// }

if(!validsModes.includes(opts.mode.toLowerCase())){
    console.log("Just admted dev and prod mode")
    process.exit()
}

const mode=opts.mode


dotenv.config({
    override:true,
    path:mode==="dev" ? "./.env.development" : "./.env"
})

const config={
    general_config:{
        PORT:process.env.PORT || 5555,
        PERSISTENCI_TYPE:process.env.PERSISTENCI_TYPE
    },
    database:{
        MONGO_URL:process.env.MONGO_URL,
        DBNAME:process.env.DBNAME
    }
    
    
    
}




module.exports = {config}