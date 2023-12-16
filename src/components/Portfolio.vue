<script setup>

    // cd2ee0a6d2cd402367433ac1665680c96e1b77b8
    // Bncf83gPdE2
    import {ref, onMounted} from 'vue'
    import axios from 'axios'
    import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
    import {db} from '../firebase.js'

    const link = ref('')
    const shortenedLink = ref('')
    const loading = ref(false)
    const token = 'cd2ee0a6d2cd402367433ac1665680c96e1b77b8' //YOUR TOKEN //my token => 7ed9b44598093c5a723c5907d662e54376fedcd0
    const guid = 'Bncf83gPdE2'
    const task = ref('')
    const tasks = ref([])
    const tab = ref(null)

    async function validURL() {
        loading.value = true
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        const valid = !!pattern.test(link.value);
        if(valid) {

            const url = 'https://api-ssl.bitly.com/v4/shorten'
            const data = {
                "group_guid": `${guid}`,
                "domain": "bit.ly",
                "long_url": link.value
            }  
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            }

            await axios.post(url, data, config)
            .then(result => {
                shortenedLink.value = result.data.link
                loading.value = false
            })
            .catch(err => {
                shortenedLink.value = err.message
                loading.value = false
            })
        }
    }

 
    async function getTasks() {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        let tasksCollection = []
        querySnapshot.forEach((doc) => {
            tasksCollection.push({
                id: doc.id,
                name: doc.data().name,
                status: doc.data().status
            })
        })
        tasks.value = tasksCollection
    }

    async function deleteTask(id) {
        await deleteDoc(doc(db, "tasks", id))
        getTasks()
    }

    async function updateTask(id) {
        await updateDoc(doc(db, "tasks", id), {
            status: 'OK'
        })
        getTasks()
    }

    async function addTask() {
        loading.value = true
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                name: task.value,
                status: "pending",
            })
            loading.value = false
            console.log("Document written with ID: ", docRef.id)
        } catch (e) {
            console.error("Error adding document: ", e)
        }
        task.value = ''
        getTasks()
    }

    onMounted(() => {
        getTasks()
    })

    const headers = [
        { title: "Task", align: "center" },
        { title: "Status", align: "center" },
        { title: "Action", align: "center" }
    ]

</script>
<template >
  <v-card>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab value="home">Home</v-tab>
        <v-tab value="about">About</v-tab>
        <v-tab value="todo">Todo</v-tab>
        <v-tab value="myapp">Myapp</v-tab>
    </v-tabs>
    <v-window v-model="tab">
        <v-window-item value="home">
                
                

                <section ref="homeRef" class="home">
            <v-card height="500" style="margin-top: 4%; background-color: rgb(173, 250, 224);">
                <v-row justify="center">
                    <v-col cols="6">
                        <div class="text-center" style="margin-top: 20%">
                            <p class="text-h3" >I am Alexis D Jumao-as</p>

                        <div style="20px; margin: 20px;">
                            <v-btn icon="mdi-facebook" class="me-2" src="https://www.facebook.com/glen.yaon.1"></v-btn>
                            <v-btn icon="mdi-instagram" class="me-2" src="https://www.instagram.com/alexisjumaoas/"></v-btn>
                            <v-btn icon="mdi-github" src="https://github.com/Alexis/1027" ></v-btn>
                        </div>

                        </div>
                    </v-col>
                    <v-col cols="4">
                        <div style="margin-right: 30%; margin-top:10%" >
                            <v-avatar size="350" style="box-shadow: 2px 4px 80px 45px rgb(255, 204, 36) " >
                                <v-img
                                cover
                                src="https://bit.ly/3RHj7zU"></v-img>
                            </v-avatar>
                        </div>
                    </v-col>
                
            </v-row>
            </v-card>
      </section>
           
        </v-window-item>
        <v-window-item value="about">

                <section ref="aboutRef">
        <v-card height="500" style="margin-top: 4%; background-color: rgb(173, 250, 224);">
        
            <v-row>
                    <v-col cols="6">
                        <div style="margin-left: 40%; margin-top:10%">
                            <v-avatar size="300" style="box-shadow: 2px 4px 80px 45px rgb(255, 204, 36) ">
                            <v-img cover src="https://bit.ly/3RHj7zU"></v-img>
                        </v-avatar>
                        </div>
                    </v-col>
                    <v-col cols="6" style="margin-top: 5%">
                        <p class="text-h4">About me</p><br>
                        <p class="text-h6"> 
                        
                        <p>
                            I am Jumao-as Alexis D, 23 years of age and I graduated <br>
                            at Cordova National High School. I'm taking up a Bachelor <br>
                            of Science in Information Technology. My hobbies are playing basketball, <br>
                            drums, drawing, and playing online games. I am not rich <br>
                            man but I will never give up for my dreams because <br>
                            I know that I can do it. I do believe in a saying that, <br>
                            "In my own words Everything negative pressure, challenges is all an opportunity for me to rise "<br>
                            
                        </p>
                         </p>
                    </v-col>
                    
            </v-row>
        </v-card>
      </section>

        </v-window-item>
        <v-window-item value="todo">
            <v-container style="margin-top: 4%; background-color: rgb(173, 250, 224);">
                
                <v-text-field v-model="task" label="Task" :loading="loading">
                    <template v-slot:append>
                        <v-btn @click="addTask()" :loading="loading">Add task</v-btn>
                    </template>
                </v-text-field>
                <v-data-table :items="tasks" :headers="headers">
                
                        <template v-slot:item="{item}">
                            <tr>
                                <td class="text-center">{{ item.name }}</td>
                                <td class="text-center">{{ item.status }}</td>
                                <td class="justify-center d-flex">
                                    <v-btn prepend-icon="mdi-check" size="small" class="me-3 mt-3" @click="updateTask(item.id)" color="green">Complete</v-btn>
                                    <v-btn prepend-icon="mdi-delete-empty-outline" size="small" class="mt-3" @click="deleteTask(item.id)" color="red">Delete</v-btn>
                                </td>
                            </tr>
                        </template>

                </v-data-table>
            </v-container>
        </v-window-item>
        <v-window-item value="myapp">
            <v-container fluid>
                <p class="text-h3 text-center">Link shortener </p>
                <v-text-field label="Enter a URL" class="mt-5" prepend-inner-icon="mdi-link" v-model="link" @keydown.enter="validURL()">

                </v-text-field>
                <v-row class="justify-center">
                    <v-btn color="green" @click="validURL()">Shorten</v-btn>
                    
                </v-row>
                <v-container>
                    <h3> {{ shortenedLink }} </h3>
                <v-row>
                    <v-col cols="5">
                        <v-progress-linear
                    color="deep-purple-accent-4"
                    indeterminate
                    rounded
                    v-show="loading"
                    height="3"
                ></v-progress-linear>
                    </v-col>
                </v-row>
                </v-container>
            </v-container>
        </v-window-item>
    </v-window>
  </v-card>
</template>

