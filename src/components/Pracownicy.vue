<template>

  <v-container grid-list-md text-xs-center>

    <v-layout row wrap>

      <v-flex xs0 sm1 md1 lg2>

      </v-flex>

      <v-flex xs12 sm10 md10 lg8>

        <v-card>

          <v-toolbar flat color="white">

            <v-toolbar-title>Pracownicy</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Dialog button which is opening dialog window starts here -->

            <v-dialog 
            v-model="dialog" 
            max-width="500px" 
            persistent
            >

              <template v-slot:activator="{ on }">

                <v-btn 
                color="blue lighten-1" 
                dark class="mb-2" 
                v-on="on"
                >Nowy pracownik
                </v-btn>

              </template>

              <!-- Dialog window starts here -->

              <v-card>

                <v-card-title>

                  <v-toolbar flat color="white">

                    <v-toolbar-title>Dodawanie nowego pracownika</v-toolbar-title>

                  </v-toolbar>

                </v-card-title>

                <v-card-text>

                  <v-container grid-list-md>

                    <v-layout wrap>

                      <v-flex xs12 sm6 md6>

                        <v-text-field 
                        maxlength="20" 
                        v-model="newEmployee.imie" 
                        label="Imię"
                        ></v-text-field>

                      </v-flex>

                      <v-flex xs12 sm6 md6>

                        <v-text-field
                          maxlength="25"
                          v-model="newEmployee.nazwisko"
                          label="Nazwisko"
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs12 sm12 md12>

                        <v-select 
                        v-model="newEmployee.dzial" 
                        :items="dzialyToSelect" 
                        label="Dział"
                        ></v-select>

                      </v-flex>

                      <v-flex xs12 sm6 md6>

                        <v-text-field
                          :mask="digits"
                          v-model="newEmployee.wynagrodzenieKwota"
                          label="Wynagrodzenie"
                        ></v-text-field>

                      </v-flex>

                      <v-flex xs12 sm6 md6>

                        <v-select
                          v-model="newEmployee.wynagrodzenieWaluta"
                          :items="waluty"
                          label="Waluta"
                        ></v-select>

                      </v-flex>

                    </v-layout>

                  </v-container>

                </v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn
                    color="red lighten-1"
                    flat
                    v-bind:class="{ active: isActive }"
                  >Wypełnij wszystkie pola
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn 
                  color="blue lighten-1" 
                  flat @click="close"
                  >Anuluj
                  </v-btn>
                  <v-btn 
                  color="blue lighten-1" 
                  flat 
                  @click="save"
                  >Dodaj
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-dialog>

          </v-toolbar>

          <!-- Filters starts here -->

          <v-toolbar flat color="white">
            <v-text-field
              append-icon="search"
              label="Imię lub nazwisko"
              single-line
              hide-details
              @input="filterImieLubNazwisko"
            ></v-text-field>

            <v-select 
            class="dzial" 
            :items="dzialy" 
            label="Dział" 
            @change="filterDzial"
            ></v-select>

            <v-text-field
              class="ml-3"
              label="Kwota minimalna"
              :mask="digits"
              clearable
              single-line
              hide-details
              @input="filterKwotyMin"
            ></v-text-field>

            <v-text-field
              class="ml-3"
              label="Kwota maksymalna"
              :mask="digits"
              clearable
              single-line
              hide-details
              @input="filterKwotyMax"
            ></v-text-field>

          </v-toolbar>

          <!-- Table data starts here -->

          <v-data-table
            no-results-text="Nie znaleziono rekordów spełniających dane kryteria."
            :headers="headers"
            :items="PRACOWNICY"
            item-key="nazwisko"
            :search="filters"
            hide-actions
            :custom-filter="customFilter"
          >

          <!-- Table headers -->

            <template 
            slot="headers" 
            slot-scope="props"
            >

              <tr>

                <th 
                v-for="header in props.headers" 
                :key="header.text"
                >{{ header.text }}</th>

              </tr>

            </template>

            <!-- Table items -->

            <template slot="items" slot-scope="props">

              <tr>

                <td>{{ props.item.imie }}</td>
                <td>{{ props.item.nazwisko }}</td>
                <td>{{ props.item.dzial }}</td>
                <td>
                  {{ (props.item.wynagrodzenieKwota * 1).toFixed(2) }}
                  {{ props.item.wynagrodzenieWaluta }}
                </td>

              </tr>

            </template>

          </v-data-table>

          <!-- Summary starts here -->

          <v-toolbar flat color="white">

            <v-toolbar-title>Wynagrodzenia</v-toolbar-title>

          </v-toolbar>

          <v-flex class="ml-4" xs6 sm5 md5 lg4>

            <div style="clear: both;">

              <p class="left-align">
                <strong>IT:</strong>
              </p>

              <p class="right-align">
                {{totalIt.toFixed(2)}} PLN
                <br />
              </p>

            </div>

            <br />

            <div style="clear: both;">

              <p class="left-align">
                <strong>Administracja:</strong>
              </p>

              <p class="right-align">
                {{totalAdministracja.toFixed(2)}} PLN
                <br />
              </p>

            </div>

            <div style="clear: both;">
              <p class="left-align">
                <strong>Handlowiec:</strong>
              </p>

              <p class="right-align">
                {{totalHandlowiec.toFixed(2)}} PLN
                <br />
              </p>

            </div>

            <div style="clear: both;">
              <p class="left-align">
                <strong>Łącznie:</strong>
              </p>

              <p class="right-align">
                {{total.toFixed(2)}} PLN
                <br />
              </p>

            </div>

            <br />
            <br />

          </v-flex>

          <v-flex xs0 sm1 md1 lg2>

          </v-flex>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>

import employees from "./json/employees.json";

export default {
  data: () => ({
    PRACOWNICY: employees,
    digits: "#####",
    isActive: true,
    dialog: false,
    newEmployeeIndex: -1,
    dzialy: [],
    dzialyToSelect: [],
    waluty: [],
    headers: [
      {
        text: "Imię",
        value: "imie",
        sortable: false
      },
      {
        text: "Nazwisko",
        value: "nazwisko",
        sortable: false
      },
      {
        text: "Dział",
        value: "dzial",
        sortable: false
      },
      {
        text: "Wynagrodzenie",
        value: "wynagrodzenieKwota",
        sortable: false
      }
    ],
    filters: {
      search: "",
      dzial: "",
      wynagrodzenieKwotaMin: "",
      wynagrodzenieKwotaMax: ""
    },
    newEmployee: {
      imie: "",
      nazwisko: "",
      dzial: "",
      wynagrodzenieKwota: "",
      wynagrodzenieWaluta: ""
    },
    defaultEmployee: {
      imie: "",
      nazwisko: "",
      dzial: "",
      wynagrodzenieKwota: "",
      wynagrodzenieWaluta: ""
    }
  }),

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.newEmployee = Object.assign({}, this.defaultEmployee);
        this.newEmployeeIndex = -1;
      }, 300);
      this.isActive = true;
    },

    save() {
      if (
        this.newEmployee.imie == "" ||
        this.newEmployee.nazwisko == "" ||
        this.newEmployee.dzial == "" ||
        this.newEmployee.wynagrodzenieKwota == "" ||
        this.newEmployee.wynagrodzenieWaluta == ""
      ) {
        this.isActive = false;
      } else {
        this.PRACOWNICY.push(this.newEmployee);
        let parsed = JSON.stringify(this.PRACOWNICY);
        localStorage.setItem("PRACOWNICY", parsed);
        this.close();
      }
    },

    customFilter(items, filters, filter, headers) {
      // Init the filter class.
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      cf.registerFilter("search", function(searchWord, items) {
        if (searchWord.trim() === "") return items;

        return items.filter(item => {
          return (
            item.nazwisko.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.imie.toLowerCase().includes(searchWord.toLowerCase())
          );
        }, searchWord);
      });

      cf.registerFilter("dzial", function(dzial, items) {
        if (dzial.trim() === "") return items;

        return items.filter(item => {
          if (dzial == "Wszystkie") {
            return item.dzial;
          } else if (item.dzial == dzial) {
            return item.dzial === dzial;
          }
        }, dzial);
      });

      cf.registerFilter("wynagrodzenieKwotaMin", function(
        wynagrodzenieKwotaMin,
        items
      ) {
        if (wynagrodzenieKwotaMin === "") return items;

        return items.filter(item => {
          if (item.wynagrodzenieKwota * 1 >= wynagrodzenieKwotaMin * 1) {
            return item.wynagrodzenieKwota;
          }
        }, wynagrodzenieKwotaMin);
      });

      cf.registerFilter("wynagrodzenieKwotaMax", function(
        wynagrodzenieKwotaMax,
        items
      ) {
        if (wynagrodzenieKwotaMax === "") return items;

        return items.filter(item => {
          if (item.wynagrodzenieKwota * 1 <= wynagrodzenieKwotaMax * 1) {
            return item.wynagrodzenieKwota;
          }
        }, wynagrodzenieKwotaMax);
      });

      // Its time to run all created filters.
      // Will be executed in the order thay were defined.
      return cf.runFilters();
    },

    /**
     * Handler when user input something at the "Imię lub nazwisko" text field.
     */

    filterImieLubNazwisko(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        search: val
      });
    },

    /**
     * Handler when user  select some option at the "Dział" select.
     */
    filterDzial(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        dzial: val
      });
    },

    /**
     * Handler when user input something at the "Kwota minimalna" text field.
     */

    filterKwotyMin(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        wynagrodzenieKwotaMin: val
      });
    },

    /**
     * Handler when user input something at the "Kwota maksymalna" text field.
     */

    filterKwotyMax(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        wynagrodzenieKwotaMax: val
      });
    }
  },

  computed: {

    total() {
      return this.PRACOWNICY.reduce((total, item) => {
        return total + item.wynagrodzenieKwota * 1;
      }, 0);
    },

    totalIt() {
      return this.PRACOWNICY.reduce((total, item) => {
        if (item.dzial == "IT") {
          return total + item.wynagrodzenieKwota * 1;
        } else {
          return total;
        }
      }, 0);
    },

    totalAdministracja() {
      return this.PRACOWNICY.reduce((total, item) => {
        if (item.dzial == "Administracja") {
          return total + item.wynagrodzenieKwota * 1;
        } else {
          return total;
        }
      }, 0);
    },

    totalHandlowiec() {
      return this.PRACOWNICY.reduce((total, item) => {
        if (item.dzial == "Handlowiec") {
          return total + item.wynagrodzenieKwota * 1;
        } else {
          return total;
        }
      }, 0);
    }
  },

  mounted() {
    for (var x in this.PRACOWNICY) {
      this.dzialy.push(this.PRACOWNICY[x].dzial);
    }

    for (var y in this.PRACOWNICY) {
      this.dzialyToSelect.push(this.PRACOWNICY[y].dzial);
    }

    for (var z in this.PRACOWNICY) {
      this.waluty.push(this.PRACOWNICY[z].wynagrodzenieWaluta);
    }
    this.dzialy.unshift("Wszystkie");

    if (localStorage.getItem("PRACOWNICY")) {
      this.PRACOWNICY = JSON.parse(localStorage.getItem("PRACOWNICY"));
    }
  }
};
</script>

<style scoped>

.active {
  visibility: hidden;
}

.dzial {
  margin-top: 20px;
  margin-left: 15px;
}

p {
  text-align: justify;
  text-justify: inter-word;
}

.left-align {
  float: left;
}

.right-align {
  float: right;
}
</style>
