<template>
  <div class="file">
    <p>{{ userid }}さんがログイン中</p>
    <p>{{ result }}</p>
    <ul>
      <li is="filelist" v-for="(file, index) in files" v-bind:key="file" v-bind:filenm="file" v-on:remove="file_delete(index)" v-on:download="file_download(index)"></li>
    </ul>
    <div>
      <input type="file" name="uploadfile" v-on:change="file_selected" v-if="visible">
      <button type="button" v-on:click="file_upload()">upload</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import fileDownload from 'react-file-download'
import Router from '@/router/index'
import FileListView from '@/components/FileList/FileListItem'

export default {
  name: 'file',
  data: function () {
    return {
      result: '',
      userid: '',
      files: [],
      uploadFile: null,
      visible: true
    }
  },
  created: function () {
    var self = this
    axios.get('/userfile/api/sessionuser')
      .then(function (res) {
        if (!res.data.login) {
          // no session
          Router.push('login')
        } else {
          self.userid = res.data.userid
          axios.get('/userfile/api/filelist', {
            params: {
              userid: self.userid
            }
          })
            .then(function (res) {
              if (res.data.error) {
                self.result = res.data.error
              } else {
                self.files = res.data.files
              }
            })
            .catch(function (err) {
              self.result = err
            })
        }
      })
      .catch(function (err) {
        console.log(err)
        Router.push('login')
      })
  },
  methods: {
    file_delete: function (index) {
      var self = this
      axios.post('/userfile/api/delete', {
        userid: self.userid,
        filename: self.files[index]
      })
      .then(function (res) {
        if (res.data.result) {
          self.result = 'file delete success.'
          axios.get('/userfile/api/filelist', {
            params: {
              userid: self.userid
            }
          })
            .then(function (res) {
              if (res.data.error) {
                self.result = res.data.error
              } else {
                self.files = res.data.files
              }
            })
            .catch(function (err) {
              self.result = err
            })
        } else {
          self.result = res.data.error
        }
      })
    },
    file_download: function (index) {
      var self = this
      var filename = self.files[index]
      axios.get('/userfile/api/download', {
        responseType: 'blob',
        params: {
          userid: self.userid,
          filename: self.files[index]
        }
      })
      .then(function (res) {
        if (res.data.error) {
          self.result = res.data.error
        } else {
          console.log(res)
          fileDownload(res.data, filename)
        }
      })
      .catch(function (err) {
        self.result = err
      })
    },
    file_selected: function (e) {
      e.preventDefault()
      this.uploadFile = e.target.files[0]
    },
    file_upload: function () {
      var self = this
      if (this.uploadFile) {
        var formData = new FormData()
        formData.append('uploadfile', this.uploadFile)
        formData.append('userid', this.userid)
        var config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        axios.post('/userfile/api/upload', formData, config)
          .then(function (res) {
            if (res.data.result) {
              self.result = 'upload success.'
              axios.get('/userfile/api/filelist', {
                params: {
                  userid: self.userid
                }
              })
                .then(function (res) {
                  if (res.data.error) {
                    self.result = res.data.error
                  } else {
                    self.files = res.data.files
                    self.uploadFile = null
                    self.visible = false
                    self.$nextTick(function () {
                      self.visible = true
                    })
                  }
                })
                .catch(function (err) {
                  self.result = err
                })
            } else {
              self.result = res.data.error
            }
          })
          .catch(function (err) {
            self.result = err
          })
      } else {
        self.result = 'file not selected'
      }
    }
  },
  components: {
    'filelist': FileListView
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>

<style>
li.filelist {
  clear: both;
  margin-bottom: 10px;
}
li.filelist .dlbutton {
  float: left;
}
li.filelist .delbutton {
  float: left;
}
li.filelist .filenm {
  margin-left: 140px;
}
</style>