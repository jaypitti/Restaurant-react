20.times do
  Menu.create(
    name: Faker::Food.dish,
    description: Faker::Food.description,
    price: Faker::Commerce.price.to_f,
  )
end
