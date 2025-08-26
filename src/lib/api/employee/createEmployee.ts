import { adminDb } from "@/lib/firebase/firebaseAdminConfig";
import { CollectionNames } from "@/lib/firebase/firebaseAdminConfig";
import { CreateEmployeeParams } from "@/types/employee.type";
import { Timestamp } from "firebase-admin/firestore";

const createEmployee = async (params: CreateEmployeeParams) => {
  const employeesCollection = adminDb.collection(CollectionNames.employees);

  return await employeesCollection.add({
    ...params,
    createdAt: Timestamp.now(),
  });
};

export default createEmployee;
