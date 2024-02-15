 const dataController = (req, res) => {
    res.status(200).send({
        message: "welcome to route",
        sucess:true,
    })
};

module.exports ={dataController};