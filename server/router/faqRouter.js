

import express from "express"
import { addFaq, deleteFaq, getFaq, getFaqs, updateFaq } from "../controller/faqController.js"
import { verifyToken } from "../Utils/verify.js"


const faqRouter = express.Router()



faqRouter.post('/add-faq',verifyToken, addFaq)


faqRouter.get('/get-faq/:faqId', getFaq)


faqRouter.get('/get-faqs', getFaqs)


faqRouter.put('/update-faq/:faqId', verifyToken, updateFaq)


faqRouter.delete('/delete-faq/:faqId', verifyToken, deleteFaq)



export default faqRouter 