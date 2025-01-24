
import Faq from "../model/faqModel.js"
import { errorHandler } from "../Utils/error.js"



export const addFaq = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to add faq"))
    }

    const {answer,question,category} = req.body

    try
    {
        const faq = new Faq({
            answer,question,category
        })

        await faq.save()

        res.status(200).json({success:true , faq})
    }
    catch(error)
    {
        next(error)
    }

}



export const getFaq = async (req,res,next) => {

    const {faqId} = req.params

    try
    {
        const faq = await Faq.findById(faqId)

        if(!faq)
        {
            return next(errorHandler(404,"faq not found"))
        }

        res.status(200).json({success:true , faq})

    }
    catch(error)
    {
        next(error)
    }

}



export const getFaqs = async (req,res,next) => {

    try
    {
        const faqs = await Faq.find({}).sort({_id:-1})

        res.status(200).json({success:true , faqs})

    }
    catch(error)
    {
        next(error)
    }

}



export const updateFaq = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to update faq"))
    }

    const {faqId} = req.params

    const faq = await Faq.findById(faqId)

    if(!faq)
    {
        return next(errorHandler(404,"faq not found"))
    }

    try
    {

        const updatedFaq = await Faq.findByIdAndUpdate(
            faqId,
            {
                $set:{
                    question:req.body.question,
                    answer:req.body.answer
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedFaq})

    }
    catch(error)
    {
        next(error)
    }

}



export const deleteFaq = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to delete faq"))
    }

    const {faqId} = req.params

    const faq = await Faq.findById(faqId)

    if(!faq)
    {
        return next(errorHandler(404,"faq not found"))
    }
     
    try
    {

        await Faq.findByIdAndDelete(faqId)

        res.status(200).json({success:true , message:"Faq has been delete"})

    }
    catch(error)
    {
        next(error)
    }

}

