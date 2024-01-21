import { databases } from './client';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';


class AppwriteServiceData {
  async getTodosGroupedByColumn(){

    const data = await databases.listDocuments(
      process.env.EXPO_PUBLIC_DATABASE_ID!,
      process.env.EXPO_PUBLIC_TODOS_COLLECTION_ID!
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
}

export default AppwriteServiceData;