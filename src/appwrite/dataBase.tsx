import { databases } from './client';
import { CardModel } from '@intechnity/react-native-kanban-board';
import { ID, Query } from 'appwrite';
import { ImageLoad } from '../screens/AddCard';
class AppwriteServiceData {
  async getTodosGroupedByColumn(user_id: String){

    const data = await databases.listDocuments(
      process.env.EXPO_PUBLIC_DATABASE_ID!,
      process.env.EXPO_PUBLIC_TODOS_COLLECTION_ID!,
      [
        Query.equal('user_id', [user_id]),
      ]
    );
  
    const todos = data.documents;
    let columns: CardModel[] = [];
     await todos.forEach((item,k) => {
      columns.push(new CardModel(
        item.$id,
        item.status,
        item.title,
        "",
        "",
        [],
        0,
        k
        ));
    });
    return columns;
  };
  async addTask(todo:string, status: string,user_id: string ,file: ImageLoad | undefined): Promise<CardModel> {
    const {$id} = await databases.createDocument(
      process.env.EXPO_PUBLIC_DATABASE_ID!,
      process.env.EXPO_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
          title: todo,
          status: status,
          user_id: user_id,
          ...(file && {image: JSON.stringify(file)})
      }
    );
    return new CardModel(
      $id,
      status,
      todo,
      "",
      "",
      [],
      0,
      15
      );
  }
}

export default AppwriteServiceData;