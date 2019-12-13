require 'test_helper'

class UsercartsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @usercart = usercarts(:one)
  end

  test "should get index" do
    get usercarts_url, as: :json
    assert_response :success
  end

  test "should create usercart" do
    assert_difference('Usercart.count') do
      post usercarts_url, params: { usercart: { last_accessed_date: @usercart.last_accessed_date } }, as: :json
    end

    assert_response 201
  end

  test "should show usercart" do
    get usercart_url(@usercart), as: :json
    assert_response :success
  end

  test "should update usercart" do
    patch usercart_url(@usercart), params: { usercart: { last_accessed_date: @usercart.last_accessed_date } }, as: :json
    assert_response 200
  end

  test "should destroy usercart" do
    assert_difference('Usercart.count', -1) do
      delete usercart_url(@usercart), as: :json
    end

    assert_response 204
  end
end
