import React, {useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {List, FAB, Portal, Card, Button} from "react-native-paper";
// import todosData from "../stores/todos.json"; //测试数据
import InputTodo from "./InputTodoModal";
import DeleteTodo from "./DeleteTodoModal";
import UpdateTodo from "./UpdateTodoModal";
import withStorage from "../hoc/withStorage";
import PinTodoModal from "./PinTodoModal";
import TimeTodoModal from "./TimeTodoModal";

const TodoLists = ({todos, addTodo, updateTodo, deleteTodo,pinTodo,reloadPage}) => {

    //添加部分
    const [addModalVisible, setAddModalVisible] = useState(false);
    const showAddModal = () => setAddModalVisible(true);
    const hideAddModal = () => setAddModalVisible(false);

    //更新部分
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const hideUpdateModal = () => setUpdateModalVisible(false);
    const showUpdateModal = (task) => {
        setTaskToUpdate(task);
        setUpdateModalVisible(true);
    };

    //删除部分
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState(null);
    const showDeleteDialog = (id) => {
        setCurrentTodoId(id);
        setDialogVisible(true);
    };
    const hideDeleteDialog = () => setDialogVisible(false);

    //置顶部分
    const [pinDialogVisible, setPinDialogVisible] = useState(false)
    const [todoToPin, setTodoToPin] = useState(null);
    const showPinDialog = (todo) => {
        // console.log(todo)
        setTodoToPin(todo)
        setPinDialogVisible(true)
    }
    const hidePinDialog = () => setPinDialogVisible(false)

    //提醒部分
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const showTimeDialog = () => setTimeModalVisible(true);
    const hideTimeDialog = () => setTimeModalVisible(false);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                ListHeaderComponent={<List.Section title="您的Todos"/>}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Card onLongPress={()=>showPinDialog(item)} style={styles.card}>
                        <Card.Content>
                            <List.Item title={item.content}/>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => showUpdateModal(item.content)}>修改</Button>
                            <Button onPress={() => showDeleteDialog(item.id)}>删除</Button>
                            <Button onPress={() => showTimeDialog(item.content)}>设置提醒</Button>
                        </Card.Actions>
                    </Card>
                )}
            />
            <InputTodo
                showModal={showAddModal}
                hideModal={hideAddModal}
                visible={addModalVisible}
                addTodo={addTodo}
            />
            <UpdateTodo
                hideModal={hideUpdateModal}
                visible={updateModalVisible}
                updateTodo={(newTask) => updateTodo(newTask, taskToUpdate)}
                taskToUpdate={taskToUpdate}
            />
            <DeleteTodo
                visible={dialogVisible}
                hideDialog={hideDeleteDialog}
                onDelete={() => deleteTodo(currentTodoId)}
            />
            <PinTodoModal
                visible={pinDialogVisible}
                hideDialog={hidePinDialog}
                onPin={pinTodo}
                todoToPin={todoToPin}
            />
            {/*<Button onPress={async()=>{await clearTodos()}}>删除</Button>*/}
            <TimeTodoModal
                visible={timeModalVisible}
                hideDialog={hideTimeDialog}
                showDialog={showTimeDialog}
            />
            <Portal.Host>
                <FAB style={styles.fab} icon="plus" onPress={showAddModal}/>
                <FAB style={styles.reload} icon="reload" onPress={reloadPage}/>
            </Portal.Host>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
    reload:{
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 100,
    },
    card: {
        marginBottom: 10,
        marginLeft: 13,
        marginRight: 13
    }
});

export default withStorage(TodoLists);
