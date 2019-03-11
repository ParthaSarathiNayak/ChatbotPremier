from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet
import csv
import sys

# Searching products by asking for few specifications
class ActionSearchProduct(Action):
    def name(self):
        return 'action_search_product'

    def run(self, dispatcher, tracker, domain):
        csv_file = csv.reader(open('Output.csv', "rt", encoding = 'utf-8-sig'))
        Processor = tracker.get_slot("processor")
        product = tracker.get_slot("system")
        memory = tracker.get_slot("ram")
        
        RAM1 = memory.upper()
        RAM = RAM1.replace(" ","")
        print(Processor, product, RAM)

        #loop through csv list
        for row in csv_file:
            #if current rows 2nd value is equal to input, print that row
            if (Processor in row[3] and (RAM in row[5] or RAM in row[3]) and product in row[8]):
                prod_detail = row[1] + row[3] + row[5] + row[6]
                return [SlotSet("matches", prod_detail)]
        
        dispatcher.utter_template("utter_no_matches", tracker)
        return [SlotSet("matches", None)]


# Searching products when user needs another one
class ActionSearchProduct2(Action):
    def name(self):
        return 'action_search_product2'

    def run(self, dispatcher, tracker, domain):
        csv_file = csv.reader(open('Output.csv', "rt", encoding = 'utf-8-sig'))
        Processor = tracker.get_slot("processor")
        product = tracker.get_slot("system")
        memory = tracker.get_slot("ram")
        
        RAM1 = memory.upper()
        RAM = RAM1.replace(" ","")
        print(Processor, product, RAM)
        
        count = 0 
        #loop through csv list
        for row in csv_file:
                if (Processor in row[3] and (RAM in row[5] or RAM in row[3]) and product in row[8]):
                    if (count!=0):
                        prod_detail = row[1] + row[3] + row[5] + row[6]
                        return [SlotSet("matches", prod_detail)]
                    count = count +1
        
        dispatcher.utter_template("utter_no_matches", tracker)
        return [SlotSet("matches", None)]


# Searching after getting the storage from the user.
class ActionRestSearchProduct(Action):
    def name(self):
        return 'action_further_search_product'

    def run(self, dispatcher, tracker, domain):
        csv_file = csv.reader(open('Output.csv', "rt", encoding = 'utf-8-sig'))
        Processor = tracker.get_slot("processor")
        product = tracker.get_slot("system")
        memory = tracker.get_slot("ram")
        hdd = tracker.get_slot("storage")

        screen = tracker.get_slot("display")
        if (screen == "13"):
            screen = screen + ".3"

        RAM1 = memory.upper()
        RAM = RAM1.replace(" ","")
        hdd1 = hdd.upper()
        HDD = hdd1.replace(" ","")
        print(Processor, product, RAM, HDD, screen,os)

        #loop through csv list
        for row in csv_file:
            #if current rows 2nd value is equal to input, print that row
            if (Processor in row[3] and (RAM in row[5] or RAM in row[3]) and HDD in row[6] and screen in row[7] and product in row[8]):
                prod_detail = row[1] + row[3] + row[5] + row[6] + row[7]
                return [SlotSet("matches", prod_detail)]
        
        dispatcher.utter_template("utter_no_matches", tracker)
        return [SlotSet("matches", None)]

class ActionGiveLink(Action):
    def name(self):
        return 'action_give_link'

    def run(self, dispatcher, tracker, domain):
        csv_file = csv.reader(open('Output.csv', "rt", encoding = 'utf-8-sig'))
        Processor = tracker.get_slot("processor")
        product = tracker.get_slot("system")
        memory = tracker.get_slot("ram")
        
        RAM1 = memory.upper()
        RAM = RAM1.replace(" ","")
        print(Processor, product, RAM)

        #loop through csv list
        for row in csv_file:
            #if current rows 2nd value is equal to input, print that row
            if (Processor in row[3] and (RAM in row[5] or RAM in row[3]) and product in row[8]):
                prod_detail = row[1] + row[3] + row[5] + row[6]
                return [SlotSet("prod_id", row[0])]
        
        dispatcher.utter_template("utter_no_matches", tracker)
        return [SlotSet("prod_id", None)]


class ActionSuggest(Action):
    def name(self):
        return 'action_suggest'

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("here's what I found:")
        dispatcher.utter_message(tracker.get_slot("matches"))
        dispatcher.utter_template("utter_give_link", tracker)
        dispatcher.utter_message("is it ok for you?\n")
        return []