import connectPromise from "../../lib/mongodb";
import { registerUser } from "../../lib/register-user";

export default async function handler(req, res) {
  const connect = await connectPromise;
  const database = await connect.db("testwedingdatabase");
  const collection = database.collection("userlist");

  const dataFrontend = req.body;

  console.log("data from frontend", dataFrontend);

  const dataToInsert = {
    firstName: dataFrontend?.firstName,
    lastName: dataFrontend?.lastName,
    email: dataFrontend?.email,
    phone: dataFrontend?.phone,

    isWithCompanion: dataFrontend?.isWithCompanion,
    firstNameCompanion: dataFrontend?.firstNameCompanion,
    lastNameCompanion: dataFrontend?.lastNameCompanion,

    isComing: dataFrontend?.isComing,

    isWithChildren: dataFrontend?.isWithChildren,
    amountKids: dataFrontend?.amountKids,
    amountTeenagers: dataFrontend?.amountTeenagers,

    isVodka: dataFrontend?.isVodka,
    isGin: dataFrontend?.isGin,
    isWhisky: dataFrontend?.isWhisky,
    isBeer: dataFrontend?.isBeer,
    isNonAlcohol: dataFrontend?.isNonAlcohol,

    isPeanuts: dataFrontend?.isPeanuts,
    isEggs: dataFrontend?.isEggs,
    isNuts: dataFrontend?.isNuts,
  };

  if (!dataFrontend) {
    res
      .status(400)
      .json({ message: "missing data from frontend", error: "missing-data" });
    return;
  } else {
    res.status(200).json({
      myBody: dataFrontend,
      message: "we got your values from FORM",
    });
  }

  const result = await registerUser({ collection, dataToInsert });

  console.log('result', result)
}
