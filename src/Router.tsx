import { Route, Routes } from "react-router-dom"
import { Home } from "./page/home"
import { Portfolio } from "./page/portfolio"
import { ValidatorRegistration } from "./page/validator/register"
import { Validator } from "./page/validator"
import { ValidatorDetails } from "./page/validator/details"

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="validator/register" element={<ValidatorRegistration />} />
      <Route path="validator/:validatorId" element={<ValidatorDetails />} />
      <Route path="validator" element={<Validator />} />
    </Routes>
  )
}