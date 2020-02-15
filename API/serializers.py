from rest_framework import serializers
from back.models import Volonteer, Shelter, Task
# Create your views here.

class VolonteerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volonteer
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Volonteer` instance, given the validated data.
        """
        return Volonteer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Volonteer` instance, given the validated data.
        """
        instance.events_registered = validated_data.get('events_registered', instance.events_registered)
        instance.karma = validated_data.get('karma', instance.karma)
        instance.location = validated_data.get('location', instance.location)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.vorname = validated_data.get('vorname', instance.vorname)
        instance.nachname = validated_data.get('nachname', instance.nachname)
        instance.urlVK = validated_data.get('urlVK', instance.urlVK)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.allergy = validated_data.get('allergy', instance.allergy)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.shelters = validated_data.get('shelters', instance.shelters)
        instance.card_id = validated_data.get('card_id', instance.card_id)
        instance.save()
        return instance

class ShelterDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Shelter` instance, given the validated data.
        """
        return Shelter.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Shelter` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.image = validated_data.get('image', instance.image)
        instance.members = validated_data.get('members', instance.members)
        instance.urlVK = validated_data.get('urlVK', instance.urlVK)
        instance.coordinates = validated_data.get('coordinates', instance.coordinates)
        instance.save()
        return instance

class TaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        """
        Create and return a new `Task` instance, given the validated data.
        """
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Task` instance, given the validated data.
        """
        instance.exp = validated_data.get('exp', instance.exp)
        instance.description = validated_data.get('description', instance.description)
        instance.place = validated_data.get('place', instance.place)
        instance.date = validated_data.get('date', instance.date)
        instance.shelter = validated_data.get('shelter', instance.shelter)
        instance.allergy = validated_data.get('allergy', instance.allergy)
        instance.title = validated_data.get('title', instance.title)
        instance.status = validated_data.get('status', instance.status)
        instance.user_id = str(instance.user_id) + ',' + str(validated_data.get('user_id', instance.user_id))
        instance.save()
        return instance