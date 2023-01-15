const Product = require("../models/Product")
const account = require("../models/Account")
const Category = require("../models/Category");
const shipments = require("../models/Shipment");
const Orders = require("../models/Orders")
const Report = require("../models/Report");
const Shipment = require("../models/Shipment");
const Exceljs = require("exceljs")
const moment = require("moment")


class ManagerProductController {
    async index(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;

        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }
        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
            .catch(next)

        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })

        await Product.find({})
            .then(dta => {
                return res.render("adminUI/admin_Product", { tong_SL_User: dta_user, tong_SL_Pro: dta.map(ele => ele.toObject()), yAdm: true, dtta, title: "Table List Product", tong_SL_Category, DonHang })
            })
            .catch(next)



    }

    async getProduct(req, res, next) {

        await Product.find({})
            .then(data => {
                return res.status(200).json(data)
            })
    }

    async getListCategory(req, res, next) {
        await Category.find({

        }).then(dta => {
            return res.status(200).json(dta)
        })
    }


    async pageAddProduct(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;
        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }
        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
        var tong_SL_Pro = []
        await Product.find({}).then(dta => {
            tong_SL_Pro = dta.map(ele => ele.toObject())
        })

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })

        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })
        res.render("adminUI/add_Product", { yAdm: true, tong_SL_User: dta_user, dtta, title: "Add Product", tong_SL_Pro, tong_SL_Category, DonHang })
    }

    Add_Product(req, res, next) {
        var category = ""
        if (req.body.Category != "Choose Category...") {
            category = req.body.Category
        }
        var product = null;
        if (req.file != null) {
            product = new Product({
                Name: req.body.Name,
                Description: req.body.Description,
                Quantity: req.body.Quantity,
                image: {
                    name: req.file.filename,
                    data: req.file.filename,
                    content: "image/png"
                },
                Price: req.body.Price,
                Color: req.body.Color,
                Category: category

            })
        } else {
            product = new Product({
                Name: req.body.Name,
                Description: req.body.Description,
                Quantity: req.body.Quantity,
                image: {
                    name: "",
                    data: "",
                    content: "image/png"
                },
                Price: req.body.Price,
                Color: req.body.Color,
                Category: category
            })
        }
        product.save()
            .then(dta => {
                res.redirect("/admin/add-product")
            }).catch(next)

    }

    async Update_Product(req, res, next) {
        var category = ""
        if (req.body.Category != "Choose Category...") {
            category = req.body.Category
        }
        if (req.file != null) {
            await Product.updateOne({ _id: req.body.id }, {
                Name: req.body.Name,
                Color: req.body.Color,
                image: {
                    name: req.file.filename,
                    data: req.file.filename,
                    content: "image/png"
                },
                Description: req.body.Description,
                Price: req.body.Price,
                Category: category,
                Quantity: req.body.Quantity,

            }).then((dta) => {
                res.redirect("/admin/list-product")
            })
        }
        else {
            await Product.updateOne({ _id: req.body.id }, {
                Name: req.body.Name,
                Description: req.body.Description,
                Quantity: req.body.Quantity,
                Price: req.body.Price,
                Color: req.body.Color,
                Category: category
            }).then((dta) => {
                res.redirect("/admin/list-product")
            })
        }

    }

    Delete_Product(req, res, next) {
        Product.deleteOne({ _id: req.body.id })
            .then(() => {
                res.redirect("/admin/list-product")
            })
            .catch(next)
    }

    async Page_List_Categgory(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;

        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }

        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
            .catch(next)
        var dta_product = null
        await Product.find({})
            .then(dtta => {
                dta_product = dtta.map(dta => dta.toObject())
            })
        var tong_SL_Pro = []
        await Product.find({}).then(dta => {
            tong_SL_Pro = dta.map(ele => ele.toObject)
        })
        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })
        res.render("adminUI/admin_Category", { tong_SL_User: dta_user, dta_product, yAdm: true, dtta, title: "Table List Category", tong_SL_Pro, tong_SL_Category, DonHang })
    }

    Add_Category(req, res, next) {
        var category = new Category({
            NameCategory: req.body.NameCategory
        })
        category.save().then(dta => res.redirect("/admin/list-category")).catch(next)
    }

    Update_Category(req, res, next) {
        Category.updateOne({ _id: req.body.id }, {
            NameCategory: req.body.NameCategory
        }).then(dta => res.redirect("/admin/list-category")).catch(next)
    }

    Delete_Category(req, res, next) {
        Category.deleteOne({ _id: req.body.id })
            .then(() => res.redirect("/admin/list-category")).catch(next)
    }

    async ShipmentPage(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;

        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }
        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
            .catch(next)
        var tong_SL_Pro = []
        await Product.find({}).then(dta => {
            tong_SL_Pro = dta.map(ele => ele.toObject)
        })
        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })
        res.render("adminUI/admin_shipment", { tong_SL_User: dta_user, yAdm: true, dtta, title: "Table List Shipment", tong_SL_Pro, tong_SL_Category, DonHang })
    }

    async AddShipment(req, res, next) {

        var arr = req.body
        // console.log(arr.lstproduct)
        var lstProduct = []
        var id = ""
        var hasData = false;
        var ReqLstProduct = req.body.lstproduct.products
        for (var ele of ReqLstProduct) {
            await shipments.findOne({ idData: ele.id })
                .then((dta) => {
                    if (dta != null) {
                        return hasData = true
                    } else {
                        return hasData = false;
                    }
                }).catch(next)
            // console.log(hasData)
            if (hasData == false) {
                var quantitytemp = null;
                await Product.findOne({ _id: ele.id })
                    .then(dta => {
                        if (dta.Quantity >= ele.quantity) {
                            quantitytemp = dta.Quantity - ele.quantity
                        }
                        dta.Quantity = ele.quantity
                        lstProduct.push(dta.toObject())
                    })
                await Product.updateOne({ _id: ele.id }, {
                    Quantity: quantitytemp
                })
            } else {
                lstProduct = []
            }

        }
        var shipment = null;

        console.log(lstProduct)
        for (var ele of lstProduct) {
            shipment = new shipments({
                idData: ele._id,
                Name: ele.Name,
                Description: ele.Description,
                Quantity: ele.Quantity,
                image: {
                    name: ele.image.name,
                    data: ele.image.data,
                    content: "image/png"
                },
                Price: ele.Price,
                Color: ele.Color,
                Category: ele.Category,
            })
            await shipment.save()
        }


        //console.log(shipment)

        await shipments.find({})
            .then((dta) => {
                return res.status(200).json(dta)
            })


    }

    async GetShipment(req, res, next) {
        await shipments.find({})
            .then((dta) => {
                return res.status(200).json(dta)
            })
    }

    async DeleteShipment(req, res, next) {
        var id = req.body.id
        var quantityShipment = ""
        var quantityProd = ""

        await shipments.findOne({ idData: id })
            .then(dta => {
                quantityShipment = dta.Quantity
            })

        await Product.findOne({ _id: id })
            .then(dta => {
                if (dta != null) {
                    quantityProd = dta.Quantity
                } else {
                    quantityProd = 0;
                }

            })

        var tongQuantity = quantityProd + quantityShipment

        await Product.updateOne({ _id: id }, {
            Quantity: tongQuantity
        })

        await shipments.deleteOne({ idData: id })
            .then()
            .catch(next)

        await shipments.find({})
            .then((dta) => {
                return res.status(200).json(dta)
            })

    }

    async PageOrders(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;
        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }
        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
            .catch(next)

        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })
        var tong_SL_Pro = []
        await Product.find({})
            .then(dta => {
                tong_SL_Pro = dta.map(ele => ele.toObject())
            })
            .catch(next)

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })
        return res.render("adminUI/admin_Order", { tong_SL_User: dta_user, tong_SL_Pro, yAdm: true, dtta, title: "Table List Order", tong_SL_Category, DonHang })

    }

    async AddOrder(req, res, next) {
        console.log("ok")
        const user = req.cookies.User
        const product = req.cookies.Product
        var idUser = user._id
        var NameUser = user.firstName;
        var Email = user.email
        var NameCTM = req.body.nameCTM;
        var telCTM = req.body.telCTM;
        var address = req.body.address
        var mangPro = []

        if (product != null) {
            //update shipments
            var quantityProduct = 0
            for (var prod of product.cartProd) {
                await shipments.findOne({ idData: prod.id })
                    .then(dta => {
                        if (dta != null) {
                            quantityProduct = parseInt(dta.Quantity) - parseInt(prod.quantityProd)
                        }
                    })
                await shipments.updateOne({ idData: prod.id }, { Quantity: quantityProduct })

            }


            // add Orders
            for (var prod of product.cartProd) {

                if (prod.us_id == user._id) {
                    mangPro.push({ id: prod.id })
                    var SumPrice = parseFloat(prod.priceProd) * parseInt(prod.quantityProd)
                    var orders = new Orders({
                        idUser,
                        AccountName: NameUser,
                        Email,
                        NameCTM,
                        NumberPhone: telCTM,
                        Address: address,
                        img: prod.nameImg,
                        IdProduct: prod.id,
                        NameProduct: prod.nameProd,
                        Price: prod.priceProd,
                        Quantity: prod.quantityProd,
                        SumPrice,
                        Status: "false"
                    })
                    await orders.save();
                }
            }
            for (var i = 0; i < product.cartProd.length; i++) {
                if (product.cartProd[i].us_id == user._id) {
                    product.cartProd.splice(i, 1)
                    res.cookie("Product", product, {
                        maxAge: 24 * 60 * 60 * 100,
                        httpOnly: false,
                    })
                    i--;
                }
            }
        }
        else {
            return res.send({ msg: "No Data" })
        }
        var arrtemp = JSON.stringify(mangPro)
        return res.status(200).json({ msg: "ok", arrtemp })
    }

    async GetOrder(req, res, next) {
        await Orders.find({}).then(dta => res.status(200).json(dta))
            .catch(next)

    }

    async UpdateOrders(req, res, next) {
        console.log(req.body.idUser)
        var report = new Report({
            IdOrder: req.body.id,
            IdUser: req.body.idUser,
            IdProduct: req.body.idProd,
            NameCTM: req.body.nameCTM,
            Email: req.body.email,
            NumberPhone: req.body.numberphone,
            Address: req.body.address,
            NameProduct: req.body.nameProd,
            Quantity: req.body.quantity,
            Price: req.body.price,
            SumPrice: req.body.sumPrice,
            DateBuy: new Date()
        })
        report.save()

        await Orders.updateOne({ _id: req.body.id }, {
            Status: req.body.status
        }).then(dta => res.send("ok"))
    }

    DeleteOrder(req, res, next) {
        console.log(req.body.id)
        Orders.deleteOne({ _id: req.body.id })
            .then(dta => res.send("ok"))
            .catch(next)
    }

    async PageReport(req, res, next) {
        var dta_user = null;
        const dtta = req.cookies.User;
        if (dtta.access != "admin") {
            return res.send("Bạn không có quyền truy cập")
        }
        await account.find({})
            .then(data => {
                dta_user = data.map(dta => dta.toObject())
            })
            .catch(next)

        var tong_SL_Category = []
        await Category.find({}).then(dta => {
            tong_SL_Category = dta.map(ele => ele.toObject())
        })
        var tong_SL_Pro = []
        await Product.find({})
            .then(dta => {
                tong_SL_Pro = dta.map(ele => ele.toObject())
            })
            .catch(next)

        var DonHang = []
        await Orders.find({})
            .then(dta => {
                for (var x of dta) {
                    if (x.Status == "false") {
                        DonHang.push(x)
                    }
                }


            })

        return res.render("adminUI/admin_Report", { tong_SL_User: dta_user, tong_SL_Pro, yAdm: true, dtta, title: "Table List Report", tong_SL_Category, DonHang })
    }

    GetReport(req, res, next) {
        Report.find({})
            .then(dta => res.status(200).json(dta))
            .catch(next)
    }
    DeleteReport(req, res, next) {
        Report.deleteOne({ id: req.body.id })
            .then(dta => res.send("ok"))
            .catch(next)
    }

    GetProductPageSize(req, res, next) {
        const PAGE_SIZE = 8;
        var page = req.params.page;

        if (page) {
            page = parseInt(page)
            var soluongptuboqua = (page - 1) * PAGE_SIZE;
            Shipment.find({})
                .skip(soluongptuboqua)
                .limit(PAGE_SIZE)
                .then(dta => res.status(200).json(dta))
        }

    }

    async ExportExcell(req, res, next) {
        try {
            const reports = await Report.find({})
            console.log(reports)
            const workbook = new Exceljs.Workbook();
            const worksheet = workbook.addWorksheet("my report")
            worksheet.columns = [
                { header: 'IdOrder', key: 'IdOrder', width: 10 },
                { header: 'IdUser', key: 'IdUser', width: 10 },
                { header: 'Email', key: 'Email', width: 10 },
                { header: 'NameCTM', key: 'NameCTM', width: 10 },
                { header: 'NumberPhone', key: 'NumberPhone', width: 10 },
                { header: 'Address', key: 'Address', width: 10 },
                { header: 'IdProduct', key: 'IdProduct', width: 10 },
                { header: 'NameProduct', key: 'NameProduct', width: 10 },
                { header: 'Price', key: 'Price', width: 10 },
                { header: 'Quantity', key: 'Quantity', width: 10 },
                { header: 'SumPrice', key: 'SumPrice', width: 10 },
            ]
             let count = 1;
             reports.forEach(report => {
                worksheet.addRow(report)
             });
             worksheet.getRow(1).eachCell((cell) => {
                cell.font = {bold : true}
             })
            const datas =  workbook.xlsx.writeFile("report.xlsx")
            //  workbook.xlsx.write(res)
              res.send("Đã load! Phiền thầy xem trong thư mục của hệ thống ! nếu xem trực tiếp trên vscode nhớ cài thêm extension liên quan review data excel ạ ! cảm ơn thầy")
            //  .then(dta => {
            //     res.send("Ok")
            //     ///get-reports
            //  } ) 
        } catch (next) {
           res.status(500).send(next)
        }
    }


    async ExportExcellProduct(req, res, next) {
        try {
        //    var Day = new Date();
        //    DayExport = Day.getDate() + "/" + Day.getMonth() + "/" + Day.getFullYear()

            const products = await Product.find({})
            const workbook = new Exceljs.Workbook();
            const worksheet = workbook.addWorksheet("Product")
            worksheet.columns = [
                { header: 'Name', key: 'Name', width: 10 },
                { header: 'Quantity', key: 'Quantity', width: 10 },
                { header: 'Price', key: 'Price', width: 10 },
                { header: 'Description', key: 'Description', width: 10 },
                { header: 'Color', key: 'Color', width: 10 },
                { header: 'Category', key: 'Category', width: 10 },
                { header: 'slug', key: 'slug', width: 10 },
            ]
             let count = 1;
             products.forEach(prod => {
                worksheet.addRow(prod)
             });
             worksheet.getRow(1).eachCell((cell) => {
                cell.font = {bold : true}
             })
            const datas =  workbook.xlsx.writeFile("product.xlsx")
            //  workbook.xlsx.write(res)
              res.send("Đã load! Phiền thầy xem trong thư mục của hệ thống ! nếu xem trực tiếp trên vscode nhớ cài thêm extension liên quan review data excel ạ ! cảm ơn thầy")
        } catch (next) {
           res.status(500).send(next)
        }
    }
}

module.exports = new ManagerProductController()
